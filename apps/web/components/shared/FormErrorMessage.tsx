'use client';

import { useSearchParams } from 'next/navigation';

interface Props {
  type: 'login' | 'signup';
}

const errorMessages = {
  login: {
    invalid_credential: '이메일 또는 비밀번호가 올바르지 않습니다.',
    default: '로그인에 실패했습니다.',
  },
  signup: {
    duplicate_email: '이미 가입된 이메일입니다.',
    duplicate_nickname: '이미 사용 중인 닉네임입니다.',
    default: '회원가입에 실패했습니다.',
  },
};

const FormErrorMessage = ({ type }: Props) => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (!error) return null;

  const message =
    errorMessages[type][error as keyof (typeof errorMessages)[typeof type]] ||
    errorMessages[type].default;

  return <p className="text-sm text-red-500 mt-2">{message}</p>;
};

export default FormErrorMessage;
