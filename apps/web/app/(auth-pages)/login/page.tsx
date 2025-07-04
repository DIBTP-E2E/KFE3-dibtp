import { LoginTitle, LoginForm, SignupInfo } from '@/components/login';

const LoginPage = () => {
  return (
    <article className="w-full">
      <LoginTitle />
      <LoginForm />
      <SignupInfo />
    </article>
  );
};

export default LoginPage;
