'use client';

import { useState } from 'react';

import { SearchScreen } from '@/components/screen';

import HeaderIconButton from './HeaderIconButton';

const SearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleClick = () => setIsSearchOpen(true);
  const handleClose = () => setIsSearchOpen(false);

  return (
    <>
      <HeaderIconButton onClick={handleClick} iconName="Search" ariaLabel="검색하기" />
      <SearchScreen isOpen={isSearchOpen} onClose={handleClose} />
    </>
  );
};

export default SearchButton;
