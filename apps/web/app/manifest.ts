import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;

  return {
    // 앱 기본 정보
    name: 'DDIP(띱)',
    short_name: 'DDIP',
    description:
      '띱! 먼저 가져가는 사람이 임자! 하향식 경매 시스템을 통해 중고 물품을 거래할 수 있는 플랫폼입니다.',
    lang: 'ko',

    // 설치 식별
    id: deployUrl ? deployUrl + '/' : '/',
    start_url: '/?source=pwa', // pwa로 진입했는지 감지 여부
    scope: '/',

    // 실행 모드
    display: 'standalone',
    orientation: 'portrait',

    // 테마
    background_color: '#ffffff',
    theme_color: '#f7cb98',

    // 서비스 분류 (SEO + 일부 브라우저 UX)
    categories: ['shopping', 'lifestyle'],

    // 아이콘
    icons: [
      {
        src: '/images/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],

    // 바로가기 (주요 페이지)
    shortcuts: [
      {
        name: '상품 등록하기',
        short_name: '등록',
        description: '새로운 상품을 빠르게 등록합니다',
        url: '/products/register',
        icons: [
          {
            src: '/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: '내 채팅',
        short_name: '채팅',
        description: '채팅 목록을 확인합니다',
        url: '/chat/rooms',
        icons: [
          {
            src: '/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: '마이페이지',
        short_name: '마이',
        description: '프로필과 판매 내역을 확인합니다',
        url: '/mypage',
        icons: [
          {
            src: '/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
  };
}
