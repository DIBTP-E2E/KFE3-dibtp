/**
 * DDIP PWA Service Worker
 *
 * 실시간 경매 플랫폼에 최적화된 캐시 전략 구현
 * - Cache-First: 정적 에셋 (빠른 로딩)
 * - Stale-While-Revalidate: 이미지 (즉시 표시 + 백그라운드 갱신)
 * - Network-First with Timeout: API (최신 데이터 우선 + 캐시 폴백)
 */

// ===== 캐시 버전 및 이름 관리 =====
// 버전은 고정 사용 (파일 해시가 실질적인 버전 관리를 함)
// 긴급 상황(SW 버그, 캐시 전략 변경)에만 수동 변경
// 일반 배포 시에는 변경 불필요 (Next.js contenthash가 자동 처리)
// v1.1: Next.js 통합 개선 (/_next/image 제외) + 코드 품질 향상 (2025-10-24)
const CACHE_VERSION = 'v1.1';
const STATIC_CACHE = `ddip-static-${CACHE_VERSION}`; // 정적 에셋 캐시
const IMAGE_CACHE = `ddip-images-${CACHE_VERSION}`; // 이미지 캐시

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
const IMAGE_CACHE_MAX_SIZE = 50; // 이미지 캐시 최대 개수

// ===== Install Event =====
// Service Worker가 처음 설치될 때 실행
// 목적: 초기 리소스를 캐시에 저장하여 오프라인 대비
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);

      // 초기 리소스들을 개별 캐싱 (일부 실패해도 설치 진행)
      const results = await Promise.allSettled(STATIC_ASSETS.map((url) => cache.add(url)));

      // 실패한 리소스 로깅
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`[SW] Failed to cache: ${STATIC_ASSETS[index]}`, result.reason);
        }
      });
    })()
  );

  // skipWaiting 제거: 사용자가 사용 중인 페이지와 Service Worker 버전 불일치 방지
  // 대신 클라이언트에게 업데이트 알림 전송
});

// ===== Activate Event =====
// Service Worker가 활성화될 때 실행
// 목적: 이전 버전의 오래된 캐시를 정리하여 저장 공간 확보
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      // 현재 버전이 아닌 'ddip-'로 시작하는 모든 캐시 삭제
      // 예: ddip-static-v0, ddip-images-v0 등
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== IMAGE_CACHE &&
            cacheName.startsWith('ddip-')
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })()
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

  // ===== Cross-Origin 처리 =====
  // Same-origin이 아닌 외부 도메인 요청 처리
  if (url.origin !== self.location.origin) {
    // Supabase Storage는 이미지 캐싱을 위해 예외 허용
    if (url.hostname.includes('supabase.co')) {
      event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
      return;
    }
    // 나머지 외부 리소스(카카오맵, 구글 애널리틱스 등)는 Service Worker를 거치지 않음
    // 브라우저가 직접 처리하여 CSP, CORS 이슈 방지
    return;
  }

  // ===== 전략 1: Cache-First (정적 에셋) =====
  // 사용 목적: CSS, JS, 폰트 등 변경이 적고 빠른 로딩이 중요한 리소스
  // 동작 방식: 캐시 먼저 확인 → 없으면 네트워크 → 캐시 저장
  // Next.js 번들 파일은 제외 (빌드마다 해시 변경되므로 브라우저 캐시에만 의존)
  if (
    (request.destination === 'script' || // JS 파일
      request.destination === 'style' || // CSS 파일
      request.destination === 'font' || // 폰트 파일
      url.pathname.match(/\.(js|css|woff2)$/)) && // 확장자 기반 매칭
    !url.pathname.startsWith('/_next/static/chunks/') // Next.js 번들 제외
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // ===== 전략 2: Stale-While-Revalidate (이미지) =====
  // 사용 목적: 상품 이미지, 프로필 사진 등 빠른 표시가 중요한 리소스
  // 동작 방식: 캐시된 이미지 즉시 반환 + 백그라운드에서 최신 이미지 갱신
  // 장점: 빠른 초기 로딩 + 항상 최신 이미지로 업데이트됨
  // Next.js Image Optimization (/_next/image)은 제외 - Next.js 자체 캐시 정책 사용
  if (
    !url.pathname.startsWith('/_next/image') && // Next.js 이미지 최적화 제외
    (request.destination === 'image' || // 이미지 요청
      url.pathname.startsWith('/images/') || // /images/ 경로
      url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/)) // 이미지 확장자
  ) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  // ===== 전략 3: API 요청 처리 =====
  // 실시간 경매 플랫폼 특성상 API 캐싱은 제거
  // 이유: 30분마다 가격이 변하는 실시간 데이터를 캐싱하면 안 됨
  // 모든 API 요청은 항상 네트워크를 통해 최신 데이터 가져옴
  // (향후 정적 데이터 API가 생기면 선택적 캐싱 추가 가능)

  // ===== 전략 4: Network-First (기타 요청) =====
  // 기본 전략: 네트워크 우선, 실패 시 캐시
  event.respondWith(
    (async () => {
      try {
        return await fetch(request);
      } catch {
        return await caches.match(request);
      }
    })()
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
  const url = new URL(request.url);
  // HTTP/HTTPS 스킴이고 응답이 정상(200-299)일 때만 캐싱
  if (response.ok && (url.protocol === 'http:' || url.protocol === 'https:')) {
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
  const fetchPromise = (async () => {
    try {
      const response = await fetch(request);
      const url = new URL(request.url);

      // HTTP/HTTPS 스킴이고 응답이 정상일 때만 캐싱
      if (response.ok && (url.protocol === 'http:' || url.protocol === 'https:')) {
        await cache.put(request, response.clone());
        await limitCacheSize(cacheName, IMAGE_CACHE_MAX_SIZE);
      }
      return response;
    } catch (error) {
      // 백그라운드 갱신 실패는 치명적이지 않으므로 경고만 출력
      console.warn('[SW] Background image fetch failed:', request.url, error);
      // 캐시된 이미지를 계속 사용
      return cached;
    }
  })();

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

  // 초과분이 있으면 오래된 항목부터 병렬 삭제
  if (keys.length > maxItems) {
    const keysToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(keysToDelete.map((key) => cache.delete(key)));
  }
}

/**
 * Network-First with Timeout 전략
 * (현재 미사용 - 실시간 경매 플랫폼 특성상 API 캐싱 제거)
 *
 * 향후 정적 데이터 API (지역 목록, 카테고리 등)가 추가되면 사용 가능
 *
 * @param {Request} request - 네트워크 요청 객체
 * @param {string} cacheName - 사용할 캐시 이름
 * @param {number} timeout - 타임아웃 (밀리초, 기본 3초)
 *
 * 동작 순서:
 * 1. 네트워크 요청 시작
 * 2. 3초 이내 응답 → 캐시에 저장 후 반환
 * 3. 3초 초과 또는 네트워크 실패 → 캐시 폴백
 * 4. 캐시도 없으면 에러
 */
async function networkFirstWithTimeout(request, cacheName, timeout = 3000) {
  const cache = await caches.open(cacheName);

  try {
    // Promise.race: 네트워크 응답 vs 타임아웃 중 먼저 완료되는 것 반환
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Network timeout')), timeout)),
    ]);

    const url = new URL(request.url);
    // HTTP/HTTPS 스킴이고 응답이 정상일 때만 캐싱
    if (response.ok && (url.protocol === 'http:' || url.protocol === 'https:')) {
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
