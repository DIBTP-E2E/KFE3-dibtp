'use client';

import { Button } from '@repo/ui/components';

import { useAppNavigation } from '@web/hooks';

interface CloseTextButtonProps {
  onClick?: () => void;
  className?: string;
}

const CloseTextButton = ({ onClick, className }: CloseTextButtonProps) => {
  const { goBack } = useAppNavigation();

  return (
    <Button
      onClick={onClick ? onClick : goBack}
      size="sm"
      isTransparent
      isFullWidth={false}
      className={className}
    >
      닫기
    </Button>
  );
};

export default CloseTextButton;
