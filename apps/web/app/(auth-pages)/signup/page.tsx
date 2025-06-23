import { redirect } from 'next/navigation';

import {
  SignupTitle,
  NameInput,
  EmailInput,
  PasswordInput,
  SignupButton,
  LoginInfo,
} from '@/components/signup';
import { setServerSession } from '@/services/login/setServerSession';
import { createUserAccount } from '@/services/signup/createUserAccount';

const SignupPage = () => {
  async function handleSignup(formData: FormData) {
    'use server';

    const nickname = formData.get('nickname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await createUserAccount({ email, password, nickname });
    await setServerSession(email, password);
    redirect('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <SignupTitle />
        <form action={handleSignup}>
          <div className="space-y-4 pt-4 pb-12">
            <NameInput />
            <EmailInput />
            <PasswordInput />
          </div>
          <SignupButton />
        </form>
        <LoginInfo />
      </div>
    </main>
  );
};

export default SignupPage;
