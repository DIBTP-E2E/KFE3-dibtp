/**
 * 성능 측정 자동화: Lighthouse CI 설정 파일
 *
 * 이슈 #255 - Lighthouse CI와 GitHub Actions 통합
 *
 * 이 설정은 모바일 PWA 중심의 성능 측정을 수행합니다.
 * GitHub Actions에서 자동으로 실행되며, PR별 성능 점수를 코멘트로 제공합니다.
 *
 * 주요 특징:
 * - 모바일 우선 측정 (PWA 특성상)
 * - 인증이 필요한 페이지도 측정 (lighthouse-auth.js 연동)
 * - Core Web Vitals 중심 임계값 설정
 * - 이미지 최적화 효과 측정을 위한 성능 예산 포함
 */

module.exports = {
  ci: {
    collect: {
      // 성능 측정 대상 페이지들 (핵심 사용자 플로우 중심)
      url: [
        // === 공개 페이지 (인증 불필요) ===
        'http://localhost:3001/login', // 로그인 페이지
        'http://localhost:3001/signup', // 회원가입 페이지

        // === 핵심 플로우 페이지 (인증 필요) ===
        'http://localhost:3001/', // 홈페이지 - 메인 랜딩 및 상품 목록
        'http://localhost:3001/search?keyword=아이폰', // 검색 페이지 - 실제 키워드로 검색 결과
        'http://localhost:3001/products/register', // 상품 등록 - 폼 렌더링 성능 (초기 로딩)
        'http://localhost:3001/products/170', // 상품 상세 - 임의 상품 선택
        'http://localhost:3001/products/170/edit', // 상품 수정 - 임의 상품 선택

        // === 마이페이지 섹션 ===
        'http://localhost:3001/mypage', // 마이페이지 메인
        'http://localhost:3001/mypage/profile', // 프로필 관리
        'http://localhost:3001/mypage/sales', // 내 판매 내역
        'http://localhost:3001/mypage/bids', // 내 입찰 내역

        // === 채팅 시스템 ===
        'http://localhost:3001/chat/rooms', // 채팅 목록
        'http://localhost:3001//chat/1a6e72ba-9da1-4310-a2cc-517ea803cc36', // 임의 채팅방 선택

        // === 위치 설정 (신규 사용자 플로우) ===
        'http://localhost:3001/location', // 위치 설정 페이지
      ],
      /**
       * GitHub Actions에서 빌드된 정적 파일 경로 지정
       * Next.js 빌드 결과물(.next 폴더)을 직접 분석하여 더 정확한 성능 측정
       */
      staticDistDir: './apps/web/.next',

      /**
       * 인증이 필요한 페이지 측정을 위한 자동 로그인 스크립트
       * lighthouse-auth.js를 실행하여 Supabase 인증 후 세션 유지
       */
      puppeteerScript: './lighthouse-auth.js',

      /**
       * Lighthouse 실행 설정 (모바일 PWA 중심)
       */
      settings: {
        /**
         * 모바일 디바이스 기준 측정
         * desktop, mobile 중 선택 가능 (PWA는 주로 모바일에서 사용)
         */
        preset: 'mobile',

        /**
         * Chrome 브라우저 실행 옵션 (CI 환경 최적화)
         */
        chromeFlags: [
          '--no-sandbox',                    // 샌드박스 비활성화 (CI 환경 필수)
          '--disable-dev-shm-usage',         // /dev/shm 사용 안함 (메모리 부족 방지)
          '--disable-gpu',                   // GPU 가속 비활성화 (headless 환경)
          '--headless',                      // 헤드리스 모드 (UI 없이 실행)
          '--no-first-run',                  // 첫 실행 설정 건너뛰기
          '--no-zygote',                     // zygote 프로세스 비활성화 (안정성)
          '--single-process',                // 단일 프로세스 모드 (CI 안정성)
        ],

        /**
         * 디바이스 시뮬레이션 설정
         * mobile: 모바일 디바이스, desktop: 데스크톱
         */
        emulatedFormFactor: 'mobile',

        /**
         * 측정할 Lighthouse 카테고리 지정
         * performance: 성능, accessibility: 접근성, best-practices: 모범사례
         * seo: 검색엔진최적화, pwa: Progressive Web App
         */
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],

        /**
         * 네트워크 스로틀링 방식
         * simulate: 시뮬레이션 (빠름), devtools: 실제 제한 (정확함)
         */
        throttlingMethod: 'simulate',

        /**
         * 네트워크 및 CPU 스로틀링 설정 (3G 네트워크 시뮬레이션)
         */
        throttling: {
          rttMs: 150,                        // Round Trip Time: 150ms (3G 수준)
          throughputKbps: 1638.4,            // 다운로드 속도: 1.6Mbps (3G 수준)  
          cpuSlowdownMultiplier: 4,          // CPU 속도: 4배 느리게 (모바일 수준)
        },
      },

      /**
       * 측정 반복 횟수 (평균값으로 신뢰성 향상)
       * 모바일 성능은 변동성이 크므로 3회 측정 후 평균 사용
       */
      numberOfRuns: 3,

      /**
       * 서버 시작 대기 설정
       * GitHub Actions에서 서버가 완전히 시작될 때까지 대기
       */
      startServerReadyPattern: 'ready',      // 'ready' 문자열 감지 시 시작
      startServerReadyTimeout: 30000,        // 최대 30초 대기
    },
    /**
     * 성능 임계값 설정 (PWA 및 모바일 최적화 중심)
     * error: 빌드 실패, warn: 경고 표시, off: 체크 안함
     */
    assert: {
      assertions: {
        /**
         * === Lighthouse 카테고리별 점수 임계값 (0~1 범위) ===
         */

        // PWA 점수: 90점 이상 (중요 - PWA 기능 필수)
        'categories:pwa': ['error', { minScore: 0.9 }],

        // 성능 점수: 70점 이상 (모바일 환경 고려하여 관대하게 설정)
        'categories:performance': ['warn', { minScore: 0.7 }],

        // 접근성 점수: 90점 이상 (웹 표준 준수 중요)
        'categories:accessibility': ['error', { minScore: 0.9 }],

        // 모범사례 점수: 80점 이상 (보안, 성능 최적화)
        'categories:best-practices': ['warn', { minScore: 0.8 }],

        // SEO 점수: 80점 이상 (검색엔진 최적화)
        'categories:seo': ['warn', { minScore: 0.8 }],

        /**
         * === Core Web Vitals 임계값 (실제 성능 지표, 밀리초 단위) ===
         * Google의 공식 권장사항 기준, 모바일 네트워크 환경 고려
         */

        // FCP: 첫 콘텐츠 표시 시간 ≤ 3초 (모바일 기준 관대)
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],

        // LCP: 최대 콘텐츠 표시 시간 ≤ 4초 (모바일 기준 관대)
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],

        // CLS: 누적 레이아웃 이동 ≤ 0.1 (시각적 안정성 중요)
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],

        // TBT: 총 차단 시간 ≤ 500ms (상호작용 응답성)
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],

        // SI: 속도 지수 ≤ 5초 (시각적 완성도)
        'speed-index': ['warn', { maxNumericValue: 5000 }],

        /**
         * === PWA 특화 지표 (Progressive Web App 필수 요소) ===
         */

        // Service Worker: PWA 필수 기능
        'service-worker': 'error',

        // 모바일 뷰포트 설정: 반응형 디자인 필수
        viewport: 'error',

        // Apple Touch 아이콘: iOS 홈 화면 추가 지원
        'apple-touch-icon': 'warn',

        // 테마 색상: 브라우저 UI 테마 적용
        'themed-omnibox': 'warn',

        // 콘텐츠 너비: 뷰포트에 맞는 콘텐츠 크기
        'content-width': 'error',

        /**
         * === 모바일 UX 지표 (사용자 경험 최적화) ===
         */

        // 터치 대상 크기: 모바일에서 터치하기 적합한 크기 (44px 이상)
        'tap-targets': 'error',

        // 색상 대비: 접근성을 위한 충분한 명암비 (4.5:1 이상)
        'color-contrast': 'error',

        // 반응형 이미지: 다양한 화면 크기 대응
        'image-size-responsive': 'warn',

        /**
         * === 성능 예산 (리소스 크기 제한, 바이트 단위) ===
         * 이미지 최적화 효과 측정 및 번들 크기 관리
         */

        // 전체 이미지 크기: 1MB 이하 (이미지 최적화 효과 확인)
        'resource-summary:image:size': ['warn', { maxNumericValue: 1048576 }],

        // 전체 JavaScript 크기: 512KB 이하 (번들 크기 관리)
        'resource-summary:script:size': ['warn', { maxNumericValue: 512000 }],

        // 전체 CSS 크기: 100KB 이하 (스타일시트 최적화)
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 102400 }],
      },
    },
    /**
     * Lighthouse CI 결과 업로드 및 리포팅 설정
     */
    upload: {
      /**
       * 결과 저장 방식 선택
       * - temporary-public-storage: 임시 공용 저장소 (7일 보관, 무료)
       * - lhci: 전용 LHCI 서버 (영구 보관, 대시보드 제공)
       * - filesystem: 로컬 파일 시스템 (GitHub Actions Artifacts)
       */
      target: 'temporary-public-storage',

      /**
       * GitHub PR 코멘트 자동 생성을 위한 토큰
       * GitHub Actions에서 자동으로 제공되는 GITHUB_TOKEN 사용
       * PR에 성능 점수 표가 자동으로 댓글로 추가됨
       */
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
