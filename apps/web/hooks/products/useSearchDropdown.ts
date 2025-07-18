import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { PAGE_ROUTES } from '@/constants';

import { useRecentSearches } from './useRecentSearches';

interface UseSearchDropdownProps {
  hasDropdown?: boolean;
  onSearch?: (keyword: string) => void;
}

export const useSearchDropdown = ({
  hasDropdown = false,
  onSearch,
}: UseSearchDropdownProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addRecentSearch, recentSearches } = useRecentSearches();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 입력창 포커스 시 드롭다운 열기
  const handleInputFocus = () => {
    if (hasDropdown && recentSearches.length > 0) {
      setIsOpen(true);
    }
  };

  // 최근 검색어 클릭 시 처리
  const handleRecentSearchClick = (search: string) => {
    setIsOpen(false);

    // 검색어 저장 및 페이지 이동
    addRecentSearch(search);
    const keyword = encodeURIComponent(search);
    router.push(`${PAGE_ROUTES.SEARCH(keyword)}`);

    // 외부에서 전달된 콜백 실행
    onSearch?.(search);
  };

  // 검색 시 드롭다운 닫기
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return {
    // 상태
    isOpen,
    containerRef,
    recentSearches,

    // 함수
    handleInputFocus,
    handleRecentSearchClick,
    closeDropdown,

    // 유틸리티
    shouldShowDropdown: hasDropdown && isOpen && recentSearches.length > 0,
  };
};
