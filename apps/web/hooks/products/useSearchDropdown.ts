import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { PAGE_ROUTES } from '@/constants';

import { useRecentSearches } from './useRecentSearches';

interface UseSearchDropdownProps {
  hasDropdown?: boolean;
  onSearch?: (keyword: string) => void;
}

// 싱글톤 상태 관리
let globalIsOpen = false;
let globalSetIsOpen: ((value: boolean) => void) | null = null;
const stateSubscribers: Set<(isOpen: boolean) => void> = new Set();

const updateGlobalState = (isOpen: boolean) => {
  globalIsOpen = isOpen;
  stateSubscribers.forEach((callback) => callback(isOpen));
};

export const useSearchDropdown = ({
  hasDropdown = false,
  onSearch,
}: UseSearchDropdownProps = {}) => {
  const [isOpen, setIsOpen] = useState(globalIsOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addRecentSearch, recentSearches } = useRecentSearches();

  // 전역 상태 구독
  useEffect(() => {
    const updateLocalState = (newIsOpen: boolean) => {
      setIsOpen(newIsOpen);
    };

    stateSubscribers.add(updateLocalState);

    // 첫 번째 인스턴스에서 전역 setter 설정
    if (!globalSetIsOpen) {
      globalSetIsOpen = updateGlobalState;
    }

    return () => {
      stateSubscribers.delete(updateLocalState);
    };
  }, []);

  // 전역 상태 업데이트 함수
  const updateIsOpen = (value: boolean) => {
    if (globalSetIsOpen) {
      globalSetIsOpen(value);
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        updateIsOpen(false);
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
      updateIsOpen(true);
    }
  };

  // 최근 검색어 클릭 시 처리
  const handleRecentSearchClick = (search: string) => {
    updateIsOpen(false);

    // 검색어 저장 및 페이지 이동
    addRecentSearch(search);
    const keyword = encodeURIComponent(search);
    router.push(`${PAGE_ROUTES.SEARCH(keyword)}`);

    // 외부에서 전달된 콜백 실행
    onSearch?.(search);
  };

  // 검색 시 드롭다운 닫기
  const closeDropdown = () => {
    updateIsOpen(false);
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
