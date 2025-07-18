'use client';

import { useAppNavigation } from '@/hooks';

import HeaderIconButton from './HeaderIconButton';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  const { goBack } = useAppNavigation();

  return (
    <HeaderIconButton
      onClick={onClick ? onClick : goBack}
      iconName="ArrowLeft"
      ariaLabel="뒤로 가기"
    />
  );
};

export default BackButton;
