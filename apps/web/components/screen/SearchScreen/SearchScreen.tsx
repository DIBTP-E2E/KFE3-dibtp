'use client';

import { useEffect } from 'react';

import { cn } from '@repo/ui/utils/cn';

// import 체인 충돌 문제(서버 컴포넌트까지 호출)로 구체적인 경로 작성
import { SearchHeader } from '@/components/layout/header/SearchHeader';

import { RecentKeywords } from '@/components/search';

import { useKeyboardNavigation } from '@/hooks/common';
import { useSearchAction, useRecentSearches } from '@/hooks/products';

interface SearchScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchScreen = ({ isOpen, onClose }: SearchScreenProps) => {
  const { searchKeyword } = useSearchAction();
  const { recentSearches } = useRecentSearches();

  // 검색어 클릭 시 SearchScreen 닫기 + 검색 실행
  const handleKeywordClick = (keyword: string) => {
    onClose(); // SearchScreen 닫기
    searchKeyword(keyword); // 검색 실행
  };

  // 키보드 네비게이션 훅 사용 (SearchInput보다 높은 이벤트 우선순위)
  const { selectedIndex, resetSelection } = useKeyboardNavigation({
    items: recentSearches,
    isEnabled: isOpen && recentSearches.length > 0,
    onSelect: handleKeywordClick,
    onEscape: onClose,
    eventPriority: 10, // SearchInput의 기본 이벤트 우선순위(0)보다 높음
  });

  // SearchScreen이 열릴 때 선택 상태 초기화
  useEffect(() => {
    if (isOpen) {
      resetSelection();
    }
  }, [isOpen, resetSelection]);

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
        <SearchHeader onClose={onClose} autoFocus={isOpen} />

        <div className="flex-1 overflow-y-auto px-container py-container">
          <RecentKeywords onKeywordClick={handleKeywordClick} selectedIndex={selectedIndex} />
        </div>
      </section>
    </div>
  );
};

export default SearchScreen;
