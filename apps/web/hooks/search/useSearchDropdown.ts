'use client';

import { useState, useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import { useAppNavigation } from '@web/hooks';

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
  const { goToSearch } = useAppNavigation();
  const pathname = usePathname();
  const { addRecentSearch, recentSearches } = useRecentSearches();

  // 페이지 변경 시 드롭다운 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
    // 드롭다운 먼저 닫기
    setIsOpen(false);

    // 페이지 이동 후 검색어 저장 (UI 깜박임 방지)
    goToSearch(search);

    // 페이지 이동 후 검색어 저장
    setTimeout(() => {
      addRecentSearch(search);
    }, 0);

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
