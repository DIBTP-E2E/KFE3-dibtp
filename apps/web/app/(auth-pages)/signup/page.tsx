import { redirect } from 'next/navigation';
import { setServerSession } from '@/services/login/setServerSession';
import { createUserAccount } from '@/services/signup/createUserAccount';
import { FormErrorMessage } from '../../../components/shared';

import {
  SignupTitle,
  NameInput,
  EmailInput,
  PasswordInput,
  SignupButton,
  LoginInfo,
} from '@/components/signup';

const SignupPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[375px] px-4">
        <SignupTitle />
        <form action={signupAction}>
          <div className="space-y-4 pt-4 pb-12">
            <NameInput />
            <EmailInput />
            <PasswordInput />
          </div>
          <FormErrorMessage type="signup" />
          <SignupButton />
        </form>
        <LoginInfo />
      </div>
    </main>
  );
};

export default SignupPage;
