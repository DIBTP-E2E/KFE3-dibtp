import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import QueryProvider from '../providers/QueryProvider';

import '../styles/globals.css';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: '지역 기반 중고 물품 경매 플랫폼',
  description: '독특하고 재미있는 경매 시스템을 통해 중고 물품을 거래할 수 있는 플랫폼입니다.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
