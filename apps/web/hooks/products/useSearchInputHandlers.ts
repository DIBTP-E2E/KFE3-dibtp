'use client';

import { useKeyboardNavigation } from '../common';

import { useRecentSearches } from './useRecentSearches';
import { useSearchAction } from './useSearchAction';
import { useSearchDropdownState } from './useSearchDropdownState';

interface UseSearchInputHandlersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  hasSearchDropDown: boolean;
}

/**
 * SearchInput 컴포넌트 전용 핸들러 훅
 * 모든 SearchInput 관련 이벤트 핸들러들을 관리
 */
export const useSearchInputHandlers = ({
  searchTerm,
  setSearchTerm,
  hasSearchDropDown,
}: UseSearchInputHandlersProps) => {
  const { recentSearches } = useRecentSearches();
  const { searchKeyword } = useSearchAction();
  const { isOpenDropdown, containerRef, openDropdown, closeDropdown } = useSearchDropdownState();

  const showSearchDropDown = () => {
    // 입력창 포커스/클릭 시 드롭다운 열기
    if (hasSearchDropDown && recentSearches.length > 0) {
      openDropdown();
    }
  };

  // 최근 검색어 클릭 시 처리
  const handleRecentKeywordClick = (keyword: string) => {
    closeDropdown();
    setSearchTerm(keyword); // 검색어 설정
    searchKeyword(keyword); // 검색 실행
  };

  // 검색어 수정 시 처리
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    showSearchDropDown();
  };

  // 검색어 작성 완료 후 처리
  const handleSearch = () => {
    if (searchTerm.trim()) {
      closeDropdown();
      searchKeyword(searchTerm);
    }
  };

  // 키보드 네비게이션 사용
  const { selectedIndex, resetSelection } = useKeyboardNavigation({
    items: recentSearches,
    isEnabled: hasSearchDropDown && isOpenDropdown && recentSearches.length > 0,
    onSelect: handleRecentKeywordClick,
    onEscape: closeDropdown,
  });

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 화살표 키, 백스페이스, 삭제 키 등으로 드롭다운 열기
    if (hasSearchDropDown && !isOpenDropdown && recentSearches.length > 0) {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'Backspace' ||
        e.key === 'Delete'
      ) {
        e.preventDefault();
        showSearchDropDown();
        return;
      }
    }

    // 드롭다운이 열려있지 않으면 기본 엔터 동작
    if (!hasSearchDropDown || !isOpenDropdown || recentSearches.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    // 드롭다운이 열려있을 때는 키보드 네비게이션이 처리
    // 선택된 항목이 없는 경우에만 직접 검색
    if (e.key === 'Enter' && selectedIndex === -1) {
      e.preventDefault();
      handleSearch();
    }
  };

  // 드롭다운 표시 조건
  const shouldShowDropdown = hasSearchDropDown && isOpenDropdown && recentSearches.length > 0;

  return {
    // 상태
    containerRef,
    selectedIndex,
    shouldShowDropdown,

    // 핸들러
    showSearchDropDown,
    handleRecentKeywordClick,
    handleKeywordChange,
    handleSearch,
    handleKeyDown,
    closeDropdown,
    resetSelection,
  };
};
