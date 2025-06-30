import { SignupTitle, SignupForm, LoginInfo } from '@/components/signup';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <SignupTitle />
        <SignupForm />
        <LoginInfo />
      </div>
    </main>
  );
}
