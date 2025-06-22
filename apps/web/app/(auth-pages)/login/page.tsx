import { redirect } from 'next/navigation';

import {
  LoginTitle,
  EmailInput,
  PasswordInput,
  LoginButton,
  SignupInfo,
} from '../../../components/login';
import { setServerSession } from '../../../services/login/setServerSession';

const LoginPage = () => {
  async function handleLogin(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await setServerSession(email, password);

    redirect('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <LoginTitle />
        <form action={handleLogin}>
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
