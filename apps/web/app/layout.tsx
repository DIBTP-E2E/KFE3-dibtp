import type { Metadata } from 'next';

import localFont from 'next/font/local';

import QueryProvider from '../providers/QueryProvider';

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <div className="flex min-h-screen justify-center">
            <div className="w-full md:max-w-container bg-bg-light">{children}</div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
