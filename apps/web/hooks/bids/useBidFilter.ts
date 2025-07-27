'use client';

import { useState, useMemo } from 'react';

import type { BidWithProduct } from '@web/types';

interface UseBidFilterProps {
  bids: BidWithProduct[];
}

export const useBidFilter = ({ bids }: UseBidFilterProps) => {
  const currentYear = new Date().getFullYear().toString();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // 필터링된 입찰 내역
  const filteredBids = useMemo(() => {
    return bids.filter((bid) => {
      // 검색어 필터
      if (searchTerm && !bid.product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // 연도/월 필터
      const bidDate = new Date(bid.created_at);
      const bidYear = bidDate.getFullYear().toString();
      const bidMonth = (bidDate.getMonth() + 1).toString().padStart(2, '0');

      if (selectedYear && selectedYear !== bidYear) return false;
      if (selectedMonth && selectedMonth !== bidMonth) return false;

      return true;
    });
  }, [bids, searchTerm, selectedYear, selectedMonth]);

  return {
    searchTerm,
    selectedYear,
    selectedMonth,
    filteredBids,
    filteredCount: filteredBids.length,
    setSearchTerm,
    setSelectedYear: (year: string) => {
      setSelectedYear(year);
      setSelectedMonth(''); // 연도 변경시 월 초기화
    },
    setSelectedMonth,
    clearFilters: () => {
      setSearchTerm('');
      setSelectedYear('');
      setSelectedMonth('');
    },
  };
};
