'use client';

import { useRouter } from 'next/navigation';

import HeaderIconButton from './HeaderIconButton';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return <HeaderIconButton onClick={handleBack} iconName="ArrowLeft" ariaLabel="뒤로 가기" />;
};

export default BackButton;
