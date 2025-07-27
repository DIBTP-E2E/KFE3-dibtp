'use client';

import { useBidHistory, useBidFilter } from '@web/hooks';

import ProductListSkeleton from '../products/ProductListSkeleton';

import BidHistoryCard from './BidHistoryCard';
import BidHistoryEmptyState from './BidHistoryEmptyState';
import BidHistoryFilter from './BidHistoryFilter';
import BidHistorySearchEmpty from './BidHistorySearchEmpty';

/**
 * 낙찰내역 클라이언트 컨테이너
 * 데이터 로딩, 필터링, 상태 관리를 담당
 */
const BidHistoryContainer = () => {
  const { data: bidHistory, isLoading, error } = useBidHistory();

  const {
    searchTerm,
    selectedYear,
    selectedMonth,
    filteredBids,
    filteredCount,
    setSearchTerm,
    setSelectedYear,
    setSelectedMonth,
    clearFilters,
  } = useBidFilter({ bids: bidHistory?.bids || [] });

  if (isLoading) return <ProductListSkeleton />;
  if (error)
    return (
      <div className="py-lg text-center text-text-info">데이터를 불러오는데 실패했습니다.</div>
    );
  if (!bidHistory?.bids?.length) return <BidHistoryEmptyState />;

  const hasFilters = searchTerm || selectedMonth;
  const showEmpty = filteredCount === 0 && hasFilters;

  return (
    <div className="flex flex-col gap-md">
      <BidHistoryFilter
        onDateChange={(year, month) => {
          setSelectedYear(year);
          setSelectedMonth(month);
        }}
        onSearchChange={(searchTerm) => setSearchTerm(searchTerm)}
        initialSearchValue=""
        initialYear={selectedYear}
        initialMonth={selectedMonth}
      />

      {showEmpty ? (
        <BidHistorySearchEmpty onClearSearch={clearFilters} />
      ) : (
        <div className="grid gap-sm">
          {filteredBids.map((bid) => (
            <BidHistoryCard key={bid.bid_id} bid={bid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BidHistoryContainer;
