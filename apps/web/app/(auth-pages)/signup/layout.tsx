import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - 경매 플랫폼',
  description: '경매 플랫폼에 가입하여 안전한 중고거래를 시작하세요.',
};

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SignupLayout;
