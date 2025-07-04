'use client';

import { Icon } from '@repo/ui/components';
import { useRouter } from 'next/navigation';

interface TopNavigationProps {
  title: string;
  showBackButton?: boolean;
}

const TopNavigation = ({ title, showBackButton = false }: TopNavigationProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[375px] z-50 flex items-center justify-center h-14 bg-bg-light border-b border-border-base">
      {showBackButton && (
        // TODO: 추후 뒤로가기 버튼 컴포넌트로 분리 예정
        <button
          onClick={handleBack}
          className="absolute left-2 flex items-center justify-center w-12 h-12 text-text-base"
          aria-label="뒤로가기"
        >
          <Icon name="ArrowLeft" size="md" />
        </button>
      )}
      <h1 className="font-style-headline-h5">{title}</h1>
    </header>
  );
};

export default TopNavigation;
