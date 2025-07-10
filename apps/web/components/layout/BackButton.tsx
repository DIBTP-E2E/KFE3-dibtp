'use client';

import { Icon } from '@repo/ui/components';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center justify-center w-12 h-12 text-text-base"
      aria-label="뒤로가기"
    >
      <Icon name="ArrowLeft" size="md" />
    </button>
  );
};

export default BackButton;
