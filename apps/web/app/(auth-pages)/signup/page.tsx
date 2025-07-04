import { SignupTitle, SignupForm, LoginInfo } from '@/components/signup';

const SignupPage = () => {
  return (
    <article className="w-full">
      <SignupTitle />
      <SignupForm />
      <LoginInfo />
    </article>
  );
};

export default SignupPage;
