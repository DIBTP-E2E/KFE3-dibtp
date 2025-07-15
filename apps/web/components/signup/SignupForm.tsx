'use client';

import { useState, useTransition } from 'react';

import { signupAction } from '@/server-actions/signup/signupAction';

import FormErrorMessage from '@/components/shared/FormErrorMessage';

import { useAppNavigation } from '@/hooks';

import EmailInput from './EmailInput';
import NameInput from './NameInput';
import PasswordInput from './PasswordInput';
import SignupButton from './SignupButton';

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { goHome } = useAppNavigation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const res = await signupAction(formData);
        if (res.success) {
          goHome();
        }
      } catch (err: any) {
        setError(err?.message || '회원가입에 실패했습니다.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 pt-4 pb-12">
        <NameInput />
        <EmailInput />
        <PasswordInput />
      </div>
      {error && <FormErrorMessage message={error} />}
      <SignupButton pending={isPending} />
    </form>
  );
};

export default SignupForm;
