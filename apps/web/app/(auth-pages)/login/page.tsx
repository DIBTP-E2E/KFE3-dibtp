import { LoginTitle, LoginForm, SignupInfo } from '@/components/login';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <LoginTitle />
        <LoginForm />
        <SignupInfo />
      </div>
    </main>
  );
}
