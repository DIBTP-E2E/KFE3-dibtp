'use client';

import { useState, useMemo } from 'react';

interface UseBidDateFilterProps {
  onChange?: (year: string, month: string) => void;
  initialYear?: string;
  initialMonth?: string;
}

export const useBidDateFilter = ({
  onChange,
  initialYear = '',
  initialMonth = '',
}: UseBidDateFilterProps = {}) => {
  const currentYear = new Date().getFullYear().toString();

  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [isYearSheetOpen, setIsYearSheetOpen] = useState(false);
  const [isMonthSheetOpen, setIsMonthSheetOpen] = useState(false);

  // 사용 가능한 연도/월 옵션 생성
  const { yearOptions, monthOptions } = useMemo(() => {
    // 연도: 최근 5년만 제공
    const currentYearNum = new Date().getFullYear();
    const recentYears = Array.from({ length: 5 }, (_, i) => (currentYearNum - i).toString());

    // 월: 선택된 연도에 따라 결정
    const months = new Set<string>();

    if (selectedYear === '' || selectedYear === currentYear) {
      // 전체 선택이거나 현재 연도일 때는 현재 월까지만
      for (let i = 1; i <= new Date().getMonth() + 1; i++) {
        months.add(i.toString().padStart(2, '0'));
      }
    } else {
      // 다른 연도일 때는 1~12월 모두
      for (let i = 1; i <= 12; i++) {
        months.add(i.toString().padStart(2, '0'));
      }
    }

    return {
      yearOptions: recentYears,
      monthOptions: Array.from(months).sort((a, b) => b.localeCompare(a)),
    };
  }, [selectedYear, currentYear]);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth(''); // 연도 변경시 월 초기화
    setIsYearSheetOpen(false);
    onChange?.(year, '');
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsMonthSheetOpen(false);
    onChange?.(selectedYear, month);
  };

  const handleClear = () => {
    setSelectedYear('');
    setSelectedMonth('');
    onChange?.('', '');
  };

  return {
    selectedYear,
    selectedMonth,
    yearOptions,
    monthOptions,
    isYearSheetOpen,
    isMonthSheetOpen,
    onYearSheetOpen: setIsYearSheetOpen,
    onMonthSheetOpen: setIsMonthSheetOpen,
    onYearSelect: handleYearSelect,
    onMonthSelect: handleMonthSelect,
    onClear: handleClear,
  };
};
