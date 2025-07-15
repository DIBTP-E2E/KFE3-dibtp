'use client';

import { Icon } from '@repo/ui/components/Icons';

import { useAppNavigation } from '@/hooks';

const BackButton = () => {
  const { goHome } = useAppNavigation();

  const handleClick = () => {
    goHome();
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full p-1 flex items-center justify-center bg-white shadow-sm"
    >
      <Icon name="ArrowLeft" size="xs" />
    </button>
  );
};

export default BackButton;
