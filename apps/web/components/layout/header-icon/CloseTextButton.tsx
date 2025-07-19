'use client';

import { Button } from '@repo/ui/components';

import { useAppNavigation } from '@/hooks';

interface CloseTextButtonProps {
  onClick?: () => void;
}

const CloseTextButton = ({ onClick }: CloseTextButtonProps) => {
  const { goBack } = useAppNavigation();

  return (
    <Button onClick={onClick ? onClick : goBack} size="sm" isTransparent isFullWidth={false}>
      닫기
    </Button>
  );
};

export default CloseTextButton;
