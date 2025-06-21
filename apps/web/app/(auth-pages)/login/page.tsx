import {
  LoginTitle,
  EmailInput,
  PasswordInput,
  LoginButton,
  SignupInfo,
} from '../../../components/login';

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <LoginTitle />
        <div className="space-y-4 py-12">
          <EmailInput />
          <PasswordInput />
        </div>
        <LoginButton />
        <SignupInfo />
      </div>
    </main>
  );
};

export default LoginPage;
