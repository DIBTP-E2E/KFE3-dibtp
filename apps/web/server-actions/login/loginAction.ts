'use server';

import { setServerSession } from '@/services/login/server';

export const loginAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  await setServerSession(email, password);

  return { success: true };
};
