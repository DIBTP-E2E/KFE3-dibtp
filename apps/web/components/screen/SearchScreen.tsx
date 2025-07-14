'use client';

import { useEffect } from 'react';

import { Icon } from '@repo/ui/components';

import { SearchHeader } from '@/components/layout';

interface SearchScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchScreen = ({ isOpen, onClose }: SearchScreenProps) => {
  // TODO: SUPABASE에서 받아 올 수 있도록 수정 예정
  const recentSearches = ['스타벅스 머그', '스타벅스 외자', '스타벅스 프라푸치노 워터병'];

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

  const removeRecentSearch = (index: number) => {
    // 최근 검색어 삭제 로직
    console.log(index);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      className={`
        fixed inset-0 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <section className="min-h-screen bg-bg-light">
        <h2 id="search-title" className="sr-only">
          검색
        </h2>

        <SearchHeader region="강남구 역삼동" onClose={onClose} />

        <section className="mt-14 mb-16 p-container">
          <div className="flex items-center justify-between mb-container">
            <h3 className="font-style-large">최근 검색</h3>
            <button className="text-sm text-text-info">전체 삭제</button>
          </div>

          <dl className="space-y-3">
            {recentSearches.map((search, index) => (
              <li key={index} className="flex items-center justify-between gap-sm">
                <div className="flex items-center gap-sm">
                  <Icon name="ClockThin" size="xs" color="info" />
                  <span>{search}</span>
                </div>

                <button onClick={() => removeRecentSearch(index)} className="w-[24px] h-full">
                  <Icon name="Cancel" size="sm" color="info" />
                </button>
              </li>
            ))}
          </dl>
        </section>
      </section>
    </div>
  );
};

export default SearchScreen;
