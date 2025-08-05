'use client';

import { useAppNavigation } from '@/hooks';

import HeaderIconButton from './HeaderIconButton';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton = ({ onClick, className }: BackButtonProps) => {
  const { goBack } = useAppNavigation();

  return (
    <HeaderIconButton
      onClick={onClick ? onClick : goBack}
      iconName="ArrowLeft"
      ariaLabel="뒤로 가기"
      className={className}
    />
  );
};

export default BackButton;
