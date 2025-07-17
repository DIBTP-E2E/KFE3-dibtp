'use client';

import { useState } from 'react';

import { Icon } from '@repo/ui/components/Icons';
import { useQuery } from '@tanstack/react-query';

import { fetchUserRegion } from '@/lib/query/client';

interface SearchInputProps {
  resultKeyword?: string;
}

const SearchInput = ({ resultKeyword }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(resultKeyword ?? '');

  const { data: region } = useQuery<string | null>({
    queryKey: ['user-region'],
    queryFn: fetchUserRegion,
  });

  const clearSearch = () => setSearchTerm('');

  return (
    <div className="ml-md flex-1 relative flex items-center h-full bg-bg-base rounded-lg px-md">
      <input
        name="search"
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`${region} 근처에서 검색`}
        className="flex-1 bg-transparent outline-none placeholder:text-text-info"
      />
      {searchTerm && <Icon name="Cancel" onClick={clearSearch} className="px-xs" />}
    </div>
  );
};

export default SearchInput;
