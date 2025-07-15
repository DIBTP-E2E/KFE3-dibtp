import { Button } from '@repo/ui/components';

interface CloseTextButtonProps {
  onClick?: () => void;
}

const CloseTextButton = ({ onClick }: CloseTextButtonProps) => {
  return (
    <Button onClick={onClick} size="sm" isTransparent isFullWidth={false}>
      닫기
    </Button>
  );
};

export default CloseTextButton;
