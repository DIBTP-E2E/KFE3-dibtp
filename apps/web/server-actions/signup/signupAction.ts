'use server';

import { setServerSession } from '@/services/login/setServerSession';
import { createUserAccount } from '@/services/signup/createUserAccount';

export async function signupAction(formData: FormData): Promise<{ success: true } | never> {
  const nickname = formData.get('nickname') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await createUserAccount({ email, password, nickname });
    await setServerSession(email, password);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
    throw new Error(message);
  }
}
