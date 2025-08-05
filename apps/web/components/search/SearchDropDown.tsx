'use client';

import { cn } from '@repo/ui/utils/cn';

import { RecentKeywords } from '@/components/search';

interface SearchDropDownProps {
  onClose: () => void;
  onKeywordClick: (keyword: string) => void;
  selectedIndex?: number;
}

const SearchDropDown = ({ onClose, onKeywordClick, selectedIndex = -1 }: SearchDropDownProps) => {
  return (
    <>
      {/* 투명한 오버레이 - 외부 클릭 방지 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        className={cn(
          'z-50 fixed top-[var(--height-top-nav)] left-0 right-0',
          'overflow-y-auto p-container bg-bg-light',
          'transform transition-all duration-300 ease-in-out',
          'translate-y-0 opacity-100',
          'shadow-lg border-b border-border-base rounded-b-lg'
        )}
      >
        <RecentKeywords onKeywordClick={onKeywordClick} selectedIndex={selectedIndex} />
      </div>
    </>
  );
};

export default SearchDropDown;
