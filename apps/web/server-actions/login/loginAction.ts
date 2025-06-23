'use server';

import { redirect } from 'next/navigation';

import { setServerSession } from '../../services/login/setServerSession';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await setServerSession(email, password);
    redirect('/');
  } catch (err) {
    redirect('/login?error=invalid_credential');
  }
}
