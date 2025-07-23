'use client';

import { Button, Icon } from '@repo/ui/components';

interface BidHistorySearchEmptyProps {
  onClearSearch: () => void;
}

/**
 * 입찰내역 검색 결과 없음 상태 컴포넌트
 */
const BidHistorySearchEmpty = ({ onClearSearch }: BidHistorySearchEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-xl text-center">
      <div className="w-12 h-12 rounded-full bg-bg-base flex items-center justify-center mb-md">
        <Icon name="Search" size="md" className="text-text-primary" />
      </div>

      <h3 className="font-style-large mb-xs">검색 결과가 없어요</h3>

      <p className="text-center mb-xl font-style-medium text-text-info">
        검색어에 맞는 입찰 내역이 없습니다.
        <br />
        다른 키워드로 검색해보세요.
      </p>

      <Button onClick={onClearSearch} variant="outlined" size="sm">
        전체 보기
      </Button>
    </div>
  );
};

export default BidHistorySearchEmpty;
