'use client';

import { Button } from '@repo/ui/components';

interface ProfileUpdateButtonProps {
  onClick: () => void;
}

const ProfileUpdateButton = ({ onClick }: ProfileUpdateButtonProps) => {
  return (
    <Button type="button" onClick={onClick} className="w-full">
      프로필 저장
    </Button>
  );
};

export default ProfileUpdateButton;
