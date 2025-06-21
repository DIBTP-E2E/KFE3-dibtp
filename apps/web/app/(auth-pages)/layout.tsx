// 로그인, 회원가입 페이지의 레이아웃 입니다
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full max-w-[375px] px-6">{children}</div>
    </div>
  );
};

export default AuthLayout;
