import { PageContainer } from '@/components/layout';

// 로그인, 회원가입 페이지의 레이아웃 입니다
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <PageContainer>{children}</PageContainer>
    </div>
  );
};

export default AuthLayout;
