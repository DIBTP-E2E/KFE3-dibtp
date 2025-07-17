'use client';

import { useState, useEffect, useRef } from 'react';

import { Icon } from '@repo/ui/components/Icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { fetchUserRegion } from '@/services/user/client';

import { USER_REGION_QUERY_KEY, PAGE_ROUTES } from '@/constants';
import { useRecentSearches } from '@/hooks/products';

interface SearchInputProps {
  resultKeyword?: string;
  autoFocus?: boolean;
}

const SearchInput = ({ resultKeyword, autoFocus = false }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(resultKeyword ?? '');
  const router = useRouter();
  const { addRecentSearch } = useRecentSearches();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: region } = useQuery<string | null>({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: fetchUserRegion,
  });

  const clearSearch = () => setSearchTerm('');

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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const trimmedKeyword = searchTerm.trim();

      // 로컬스토리지에 검색어 저장
      addRecentSearch(trimmedKeyword);

      // 검색 결과 페이지로 이동
      const keyword = encodeURIComponent(trimmedKeyword);
      router.push(`${PAGE_ROUTES.SEARCH(keyword)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="ml-md flex-1 relative flex items-center h-full bg-bg-base rounded-lg px-md">
      <input
        ref={inputRef}
        name="search"
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`${region} 근처에서 검색`}
        className="flex-1 bg-transparent outline-none placeholder:text-text-info"
      />
      {searchTerm && <Icon name="Cancel" onClick={clearSearch} className="px-xs" />}
    </div>
  );
};

export default SearchInput;
