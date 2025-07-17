'use client';

import { useState } from 'react';

import { Icon } from '@repo/ui/components/Icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { fetchUserRegion } from '@/services/user/client';

import { USER_REGION_QUERY_KEY, PAGE_ROUTES } from '@/constants';
import { useRecentSearches } from '@/hooks/products';

interface SearchInputProps {
  resultKeyword?: string;
}

const SearchInput = ({ resultKeyword }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(resultKeyword ?? '');
  const router = useRouter();
  const { addRecentSearch } = useRecentSearches();

  const { data: region } = useQuery<string | null>({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: fetchUserRegion,
  });

  const clearSearch = () => setSearchTerm('');

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
