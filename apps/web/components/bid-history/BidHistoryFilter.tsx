'use client';

import { BidHistoryDateFilter } from './BidHistoryDateFilter';
import { BidHistorySearchFilter } from './BidHistorySearchFilter';

interface BidHistoryFilterProps {
  onDateChange?: (year: string, month: string) => void;
  onSearchChange?: (searchTerm: string) => void;
  initialSearchValue?: string;
  initialYear?: string;
  initialMonth?: string;
}

const BidHistoryFilter = ({
  onDateChange,
  onSearchChange,
  initialSearchValue,
  initialYear,
  initialMonth,
}: BidHistoryFilterProps) => {
  return (
    <div className="flex flex-col gap-md">
      <BidHistoryDateFilter
        onChange={onDateChange}
        initialYear={initialYear}
        initialMonth={initialMonth}
      />

      <BidHistorySearchFilter
        onSearch={onSearchChange}
        initialValue={initialSearchValue}
        placeholder="상품명으로 검색..."
      />
    </div>
  );
};

export default BidHistoryFilter;
