'use client';

import { useEffect } from 'react';

import { cn } from '@repo/ui/utils/cn';

import { SearchHeader } from '@/components/layout';

import RescentKeywords from './RescentKeywords';

interface SearchScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchScreen = ({ isOpen, onClose }: SearchScreenProps) => {
  // 키보드 ESC로 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      className={cn(
        'fixed inset-0 z-50',
        'transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <section className="min-h-screen bg-bg-light">
        <SearchHeader onClose={onClose} />

        <RescentKeywords />
      </section>
    </div>
  );
};

export default SearchScreen;
