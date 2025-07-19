'use client';

import { useState, useEffect, useRef } from 'react';

import { Icon } from '@repo/ui/components/Icons';
import { useQuery } from '@tanstack/react-query';

import { fetchUserRegion } from '@/services/user/client';

import { SearchDropDown } from '@/components/search';

import { USER_REGION_QUERY_KEY } from '@/constants';
import { useSearchInputHandlers } from '@/hooks/products';

interface SearchInputProps {
  resultKeyword?: string;
  autoFocus?: boolean;
  hasSearchDropDown?: boolean;
}

const SearchInput = ({
  resultKeyword,
  autoFocus = false,
  hasSearchDropDown = false,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(resultKeyword ?? '');
  const clearSearch = () => setSearchTerm('');

  const { data: region } = useQuery<string | null>({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: fetchUserRegion,
  });

  const {
    containerRef,
    selectedIndex,
    shouldShowDropdown,
    showSearchDropDown,
    handleRecentKeywordClick,
    handleKeywordChange,
    handleKeyDown,
    closeDropdown,
  } = useSearchInputHandlers({
    searchTerm,
    setSearchTerm,
    hasSearchDropDown,
  });

  useEffect(() => {
    setSearchTerm(resultKeyword ?? '');
  }, [resultKeyword]);

  // autoFocus가 true일 때 input에 포커스
  useEffect(() => {
    if (autoFocus === true && inputRef.current) {
      // SearchScreen의 애니메이션 duration이 300ms이므로 350ms로 설정
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <div ref={containerRef} className="ml-md flex-1 relative h-full">
      <div className="flex items-center h-full bg-bg-base rounded-lg px-md">
        <input
          ref={inputRef}
          name="search"
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          onFocus={showSearchDropDown}
          onClick={showSearchDropDown}
          placeholder={`${region} 근처에서 검색`}
          className="flex-1 bg-transparent outline-none placeholder:text-text-info"
        />
        {searchTerm && <Icon name="Cancel" onClick={clearSearch} className="px-xs" />}
      </div>

      {shouldShowDropdown && (
        <SearchDropDown
          onClose={closeDropdown}
          onKeywordClick={handleRecentKeywordClick}
          selectedIndex={selectedIndex}
        />
      )}
    </div>
  );
};

export default SearchInput;
