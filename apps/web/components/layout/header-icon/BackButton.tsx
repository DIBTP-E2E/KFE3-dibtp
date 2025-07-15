'use client';

import { useRouter } from 'next/navigation';

import HeaderIconButton from './HeaderIconButton';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  const router = useRouter();
  const goBack = () => router.push('/');

  return (
    <HeaderIconButton
      onClick={onClick ? onClick : goBack}
      iconName="ArrowLeft"
      ariaLabel="뒤로 가기"
    />
  );
};

export default BackButton;
