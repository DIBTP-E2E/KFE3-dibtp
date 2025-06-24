'use server';

import { redirect } from 'next/navigation';

import { setServerSession } from '../../services/login/setServerSession';
import { createUserAccount } from '../../services/signup/createUserAccount';

export async function signupAction(formData: FormData) {
  const nickname = formData.get('nickname') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await createUserAccount({ email, password, nickname });
    await setServerSession(email, password);
    redirect('/');
  } catch (err) {
    let errorCode = 'signup_failed';
    if (err instanceof Error) {
      errorCode = err.message;
    }
    redirect(`/signup?error=${errorCode}`);
  }
}
