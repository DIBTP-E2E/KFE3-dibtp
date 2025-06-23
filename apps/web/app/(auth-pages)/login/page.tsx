import {
  LoginTitle,
  EmailInput,
  PasswordInput,
  LoginButton,
  SignupInfo,
} from '../../../components/login';
import { loginAction } from '../../../server-actions/login/loginAction';

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <LoginTitle />
        <form action={loginAction}>
          <div className="space-y-4 pt-4 pb-12">
            <EmailInput />
            <PasswordInput />
          </div>
          <LoginButton />
        </form>
        <SignupInfo />
      </div>
    </main>
  );
};

export default LoginPage;
