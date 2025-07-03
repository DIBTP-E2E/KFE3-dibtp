'use client';

import { Icon } from '@repo/ui/components/Icons';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/products');
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
