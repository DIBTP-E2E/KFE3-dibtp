'use client';

import { useState, useEffect, useRef } from 'react';

import { Icon } from '@repo/ui/components/Icons';

import { useQuery } from '@tanstack/react-query';

import { fetchUserRegion } from '@/services/user/client';

import { SearchDropDown } from '@/components/search';

import { USER_REGION_QUERY_KEY } from '@/constants';
import { useRecentSearches, useSearchDropdownState, useSearchAction } from '@/hooks/products';

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
  const [searchTerm, setSearchTerm] = useState(resultKeyword ?? '');
  const { recentSearches } = useRecentSearches();
  const { searchKeyword } = useSearchAction();
  const { isOpen, containerRef, open, close } = useSearchDropdownState();
  const inputRef = useRef<HTMLInputElement>(null);
  const clearSearch = () => setSearchTerm('');

  const { data: region } = useQuery<string | null>({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: fetchUserRegion,
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

  // 입력창 포커스/클릭 시 드롭다운 열기
  const handleInputInteraction = () => {
    if (hasSearchDropDown && recentSearches.length > 0) {
      open();
    }
  };

  // 검색어 클릭 시 처리
  const handleKeywordClick = (keyword: string) => {
    close(); // 드롭다운 먼저 닫기
    setSearchTerm(keyword); // 검색어 설정
    searchKeyword(keyword); // 검색 실행
  };

  // 직접 검색 시 처리
  const handleSearch = () => {
    if (searchTerm.trim()) {
      close(); // 드롭다운 닫기
      searchKeyword(searchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div ref={containerRef} className="ml-md flex-1 relative h-full">
      <div className="flex items-center h-full bg-bg-base rounded-lg px-md">
        <input
          ref={inputRef}
          name="search"
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputInteraction}
          onClick={handleInputInteraction}
          placeholder={`${region} 근처에서 검색`}
          className="flex-1 bg-transparent outline-none placeholder:text-text-info"
        />
        {searchTerm && <Icon name="Cancel" onClick={clearSearch} className="px-xs" />}
      </div>

      {hasSearchDropDown && isOpen && recentSearches.length > 0 && (
        <SearchDropDown onClose={close} onKeywordClick={handleKeywordClick} />
      )}
    </div>
  );
};

export default SearchInput;
