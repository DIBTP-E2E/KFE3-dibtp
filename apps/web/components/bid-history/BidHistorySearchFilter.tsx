'use client';

import { Input, IconButton } from '@repo/ui/components';

import { useBidSearchFilter } from '@web/hooks';

interface BidHistorySearchFilterProps {
  onSearch?: (searchTerm: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export const BidHistorySearchFilter = ({
  onSearch,
  initialValue,
  placeholder = '상품명으로 검색...',
}: BidHistorySearchFilterProps) => {
  const { inputValue, onInputChange, onSearchSubmit, onClear } = useBidSearchFilter({
    onSearch,
    initialValue,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className="pr-10"
        />

        {inputValue && (
          <IconButton
            type="button"
            iconName="Cancel"
            iconSize="sm"
            color="lightMode"
            variant="outlined"
            buttonSize="sm"
            ariaLabel="검색어 지우기"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            isTransparent
          />
        )}
      </div>
    </form>
  );
};
