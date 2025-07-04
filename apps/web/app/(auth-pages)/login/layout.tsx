import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - 경매 플랫폼',
  description: '경매 플랫폼에 로그인하여 다양한 경매에 참여하세요.',
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LoginLayout;
