'use client';

import { useState } from 'react';

import { Icon } from '@repo/ui/components/Icons';

interface SearchInputProps {
  resultKeyword?: string;
  region: string | null;
}

const SearchInput = ({ resultKeyword, region }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(resultKeyword ?? '');

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
