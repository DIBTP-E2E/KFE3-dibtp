'use client';

import { useState } from 'react';

interface UseBidSearchFilterProps {
  onSearch?: (searchTerm: string) => void;
  initialValue?: string;
}

export const useBidSearchFilter = ({
  onSearch,
  initialValue = '',
}: UseBidSearchFilterProps = {}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearchSubmit = () => {
    const trimmedValue = inputValue.trim();
    onSearch?.(trimmedValue);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch?.('');
  };

  return {
    inputValue,
    onInputChange: handleInputChange,
    onSearchSubmit: handleSearchSubmit,
    onClear: handleClear,
  };
};
