'use client';

import { useRouter } from 'next/navigation';

import { IconButton } from '@/components/shared';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return <IconButton onClick={handleBack} iconName="ArrowLeft" ariaLabel="뒤로 가기" />;
};

export default BackButton;
