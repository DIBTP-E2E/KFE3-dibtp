'use client';

import { Button, BottomSheet, Icon } from '@repo/ui/components';

import { useBidDateFilter } from '@web/hooks';

interface BidHistoryDateFilterProps {
  onChange?: (year: string, month: string) => void;
  initialYear?: string;
  initialMonth?: string;
}

export const BidHistoryDateFilter = ({
  onChange,
  initialYear,
  initialMonth,
}: BidHistoryDateFilterProps) => {
  const {
    selectedYear,
    selectedMonth,
    yearOptions,
    monthOptions,
    isYearSheetOpen,
    isMonthSheetOpen,
    onYearSheetOpen,
    onMonthSheetOpen,
    onYearSelect,
    onMonthSelect,
    onClear,
  } = useBidDateFilter({ onChange, initialYear, initialMonth });

  const hasDateFilters =
    (selectedYear && selectedYear !== '') || (selectedMonth && selectedMonth !== '');

  return (
    <>
      <div className="flex items-center gap-sm">
        <Button
          variant="outlined"
          color="lightMode"
          size="xs"
          isFullWidth={false}
          onClick={() => onYearSheetOpen(true)}
          className="flex items-center justify-between gap-xs min-w-[72px]"
        >
          <span>{selectedYear === '' ? '전체' : selectedYear ? `${selectedYear}년` : '연도'}</span>
          <Icon name="ArrowDown" size="xs" />
        </Button>

        <Button
          variant="outlined"
          color="lightMode"
          size="xs"
          isFullWidth={false}
          onClick={() => onMonthSheetOpen(true)}
          isDisabled={false}
          className="flex items-center justify-between gap-xs min-w-[60px]"
        >
          <span>{selectedMonth === '' ? '전체' : selectedMonth ? `${selectedMonth}월` : '월'}</span>
          <Icon name="ArrowDown" size="xs" />
        </Button>

        {hasDateFilters && (
          <Button
            variant="outlined"
            color="lightMode"
            size="xs"
            isFullWidth={false}
            onClick={onClear}
          >
            초기화
          </Button>
        )}
      </div>

      <BottomSheet
        isOpen={isYearSheetOpen}
        onClose={() => onYearSheetOpen(false)}
        title="연도 선택"
      >
        <div className="space-y-2">
          <Button
            color="lightMode"
            variant="fulled"
            size="sm"
            onClick={() => onYearSelect('')}
            className="w-full justify-start"
          >
            전체
          </Button>
          {yearOptions.map((year) => (
            <Button
              key={year}
              color="lightMode"
              variant="fulled"
              size="sm"
              onClick={() => onYearSelect(year)}
              className="w-full justify-start"
            >
              {year}년
            </Button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isMonthSheetOpen}
        onClose={() => onMonthSheetOpen(false)}
        title="월 선택"
      >
        <div className="space-y-2">
          <Button
            color="lightMode"
            variant="fulled"
            size="sm"
            onClick={() => onMonthSelect('')}
            className="w-full justify-start"
          >
            전체
          </Button>
          {monthOptions.map((month) => (
            <Button
              key={month}
              color="lightMode"
              variant="fulled"
              size="sm"
              onClick={() => onMonthSelect(month)}
              className="w-full justify-start"
            >
              {month}월
            </Button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
};
