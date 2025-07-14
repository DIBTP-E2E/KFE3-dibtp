'use client';

import { useState } from 'react';

import { Icon } from '@repo/ui/components/Icons';
import { cn } from '@repo/ui/utils/cn';

import { BackButton, CloseTextButton } from '../header-icon';

import HeaderContainer from './HeaderContainer';

interface SearchHeaderProps {
  region: string;
  onClose?: () => void;
}

const SearchHeader = ({ region, onClose }: SearchHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const clearSearch = () => setSearchTerm('');

  return (
    <HeaderContainer className="pr-0">
      <h2 className={cn('font-style-headline-h5', 'sr-only')}>검색하기</h2>

      <BackButton onClick={onClose} />

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

      <CloseTextButton onClick={onClose} />
    </HeaderContainer>
  );
};

export default SearchHeader;
