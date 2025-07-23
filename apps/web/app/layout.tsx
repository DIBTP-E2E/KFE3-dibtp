import type { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import localFont from 'next/font/local';

import { createServerQueryClient, prefetchMyInfo } from '@web/lib/query/server';
import QueryProvider from '@web/providers/QueryProvider';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: '지역 기반 중고 물품 경매 플랫폼',
  description: '독특하고 재미있는 경매 시스템을 통해 중고 물품을 거래할 수 있는 플랫폼입니다.',
};

const notoSansKR = localFont({
  src: [
    {
      path: '../public/fonts/NotoSansKR-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/NotoSansKR-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NotoSansKR-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-noto-sans',
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = createServerQueryClient();
  await prefetchMyInfo(queryClient);

  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex min-h-screen justify-center">
              <div className="w-full md:max-w-container transform translate-x-0 overflow-hidden bg-bg-light relative">
                {children}
                {/* 바텀시트 포털 컨테이너 */}
                <div id="bottom-sheet-root" className="relative z-50" />
              </div>
            </div>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
