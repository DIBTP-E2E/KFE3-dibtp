'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { loginAction } from '@/server-actions/login/loginAction';

import FormErrorMessage from '@/components/shared/FormErrorMessage';

import EmailInput from './EmailInput';
import LoginButton from './LoginButton';
import PasswordInput from './PasswordInput';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const res = await loginAction(formData);
        if (res.success) {
          router.push('/');
        }
      } catch (err: any) {
        setError(err?.message || '로그인에 실패했습니다.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 pt-4 pb-12">
        <EmailInput />
        <PasswordInput />
      </div>
      {error && <FormErrorMessage message={error} />}
      <LoginButton pending={isPending} />
    </form>
  );
};

export default LoginForm;
