/**
 * DDIP PWA Service Worker
 *
 * 실시간 경매 플랫폼에 최적화된 캐시 전략 구현
 * - Cache-First: 정적 에셋 (빠른 로딩)
 * - Stale-While-Revalidate: 이미지 (즉시 표시 + 백그라운드 갱신)
 * - Network-First with Timeout: API (최신 데이터 우선 + 캐시 폴백)
 */

// ===== 캐시 버전 및 이름 관리 =====
// 버전 변경 시 모든 캐시가 새로 생성되고 이전 버전은 자동 삭제됨
const CACHE_VERSION = 'v1';
const STATIC_CACHE = `ddip-static-${CACHE_VERSION}`; // 정적 에셋 캐시
const IMAGE_CACHE = `ddip-images-${CACHE_VERSION}`; // 이미지 캐시
const API_CACHE = `ddip-api-${CACHE_VERSION}`; // API 응답 캐시

// ===== 초기 캐싱 리소스 =====
// Service Worker 설치 시 즉시 캐싱할 필수 리소스
// 오프라인 시에도 기본 UI를 표시하기 위한 최소 에셋
const STATIC_ASSETS = [
  '/', // 홈페이지
  '/favicon.ico', // 파비콘
  '/images/android-chrome-192x192.png', // PWA 아이콘 (소)
  '/images/android-chrome-512x512.png', // PWA 아이콘 (대)
  '/images/ddip_logo.png', // 로고
  '/images/ddip_logo.svg', // 로고 (벡터)
];

// ===== 설정 =====
const NETWORK_TIMEOUT = 3000; // API 요청 타임아웃 (3초)
const IMAGE_CACHE_MAX_SIZE = 50; // 이미지 캐시 최대 개수

// ===== Install Event =====
// Service Worker가 처음 설치될 때 실행
// 목적: 초기 리소스를 캐시에 저장하여 오프라인 대비
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      // 초기 리소스들을 한 번에 캐싱
      return cache.addAll(STATIC_ASSETS);
    })
  );

  // skipWaiting(): 대기 중인 Service Worker를 즉시 활성화
  // 기존 Service Worker를 기다리지 않고 바로 제어권 획득
  self.skipWaiting();
});

// ===== Activate Event =====
// Service Worker가 활성화될 때 실행
// 목적: 이전 버전의 오래된 캐시를 정리하여 저장 공간 확보
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 현재 버전(v1)이 아닌 'ddip-'로 시작하는 모든 캐시 삭제
          // 예: ddip-static-v0, ddip-images-v0 등
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== IMAGE_CACHE &&
            cacheName !== API_CACHE &&
            cacheName.startsWith('ddip-')
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // clients.claim(): 활성화 즉시 모든 클라이언트(탭)를 제어
  // 페이지 새로고침 없이도 새 Service Worker가 동작
  self.clients.claim();
});

// ===== Fetch Event =====
// 모든 네트워크 요청을 가로채서 캐시 전략 적용
// 요청 타입에 따라 최적의 전략 선택
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ===== 전략 1: Cache-First (정적 에셋) =====
  // 사용 목적: CSS, JS, 폰트 등 변경이 적고 빠른 로딩이 중요한 리소스
  // 동작 방식: 캐시 먼저 확인 → 없으면 네트워크 → 캐시 저장
  if (
    request.destination === 'script' || // JS 파일
    request.destination === 'style' || // CSS 파일
    request.destination === 'font' || // 폰트 파일
    url.pathname.match(/\.(js|css|woff2)$/) // 확장자 기반 매칭
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // ===== 전략 2: Stale-While-Revalidate (이미지) =====
  // 사용 목적: 상품 이미지, 프로필 사진 등 빠른 표시가 중요한 리소스
  // 동작 방식: 캐시된 이미지 즉시 반환 + 백그라운드에서 최신 이미지 갱신
  // 장점: 빠른 초기 로딩 + 항상 최신 이미지로 업데이트됨
  if (
    request.destination === 'image' || // 이미지 요청
    url.pathname.startsWith('/images/') || // /images/ 경로
    url.hostname.includes('supabase.co') || // Supabase Storage 이미지
    url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/) // 이미지 확장자
  ) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  // ===== 전략 3: Network-First with Timeout (API) =====
  // 사용 목적: 상품 정보, 입찰 정보 등 최신 데이터가 중요한 줏API
  // 동작 방식: 네트워크 우선 (3초 타임아웃) → 실패 시 캐시 폴백
  // 장점: 실시간 데이터 보장 + 네트워크 느릴 때 캐시로 대응
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstWithTimeout(request, API_CACHE));
    return;
  }

  // ===== 전략 4: Network-First (기타 요청) =====
  // 기본 전략: 네트워크 우선, 실패 시 캐시
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// ===== 캐시 전략 구현 함수들 =====

/**
 * Cache-First 전략
 *
 * @param {Request} request - 네트워크 요청 객체
 * @param {string} cacheName - 사용할 캐시 이름
 *
 * 동작 순서:
 * 1. 캐시에서 요청 검색
 * 2. 캐시 히트 → 즉시 반환
 * 3. 캐시 미스 → 네트워크 요청
 * 4. 응답 성공 시 캐시에 저장 후 반환
 *
 * 장점: 가장 빠른 응답 속도
 * 단점: 캐시된 데이터가 오래될 수 있음
 */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  // 응답이 정상(200-299)일 때만 캐싱
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

/**
 * Stale-While-Revalidate 전략
 *
 * @param {Request} request - 네트워크 요청 객체
 * @param {string} cacheName - 사용할 캐시 이름
 *
 * 동작 순서:
 * 1. 캐시 확인 (동기)
 * 2. 백그라운드에서 네트워크 요청 시작 (비동기, 기다리지 않음)
 * 3. 캐시 있음 → 즉시 반환 (백그라운드 갱신은 계속 진행)
 * 4. 캐시 없음 → 네트워크 응답 대기 후 반환
 *
 * 장점: 즉각적인 응답 + 자동 업데이트
 * 적용 예: 상품 이미지 (오래된 이미지 먼저 보여주고 최신 이미지로 교체)
 */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // 백그라운드 네트워크 요청 (await 없음 → 기다리지 않음)
  // 성공 시 캐시를 최신 데이터로 갱신
  const fetchPromise = fetch(request).then(async (response) => {
    if (response.ok) {
      await cache.put(request, response.clone());
      await limitCacheSize(cacheName, IMAGE_CACHE_MAX_SIZE);
    }
    return response;
  });

  // 캐시가 있으면 즉시 반환 (stale 데이터)
  // 캐시가 없으면 네트워크 응답 기다림
  return cached || fetchPromise;
}

/**
 * 캐시 크기 제한
 *
 * @param {string} cacheName - 캐시 이름
 * @param {number} maxItems - 최대 캐시 항목 수
 *
 * FIFO(First In First Out) 방식으로 오래된 캐시 항목부터 삭제
 * 이미지 캐시가 무한정 증가하는 것을 방지
 */
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    // 가장 오래된 캐시 삭제
    await cache.delete(keys[0]);
  }
}

/**
 * Network-First with Timeout 전략
 *
 * @param {Request} request - 네트워크 요청 객체
 * @param {string} cacheName - 사용할 캐시 이름
 *
 * 동작 순서:
 * 1. 네트워크 요청 시작
 * 2. 3초 이내 응답 → 캐시에 저장 후 반환
 * 3. 3초 초과 또는 네트워크 실패 → 캐시 폴백
 * 4. 캐시도 없으면 에러
 *
 * 장점: 최신 데이터 우선 + 느린 네트워크 대응
 * 적용 예: API 요청 (실시간 가격은 최신 데이터 필요, 느릴 땐 캐시라도 표시)
 */
async function networkFirstWithTimeout(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    // Promise.race: 네트워크 응답 vs 타임아웃 중 먼저 완료되는 것 반환
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network timeout')), NETWORK_TIMEOUT)
      ),
    ]);

    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // 네트워크 실패 → 캐시 폴백
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    // 캐시도 없으면 에러 throw (오프라인 폴백 페이지로 이동 등)
    throw error;
  }
}

// ===== Phase 5: 푸시 알림 =====
// 푸시 알림 기능은 Phase 5에서 구현 예정
// TODO: push 이벤트 리스너 추가
// TODO: notificationclick 이벤트 리스너 추가
