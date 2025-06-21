// 회원가입 페이지
import {
  SignupTitle,
  NameInput,
  EmailInput,
  PasswordInput,
  SignupButton,
  LoginInfo,
} from '../../../components/signup';

const SignupPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <SignupTitle />
        <div className="space-y-4 pt-4 pb-12">
          <NameInput />
          <EmailInput />
          <PasswordInput />
        </div>
        <SignupButton />
        <LoginInfo />
      </div>
    </main>
  );
};

export default SignupPage;
