'use client';

import { Button, Icon } from '@repo/ui/components';

import { useAppNavigation } from '@web/hooks';

/**
 * 입찰내역 빈 상태 컴포넌트
 */
const BidHistoryEmptyState = () => {
  const { goHome } = useAppNavigation();

  return (
    <div className="flex flex-col items-center justify-center py-xl px-container">
      <div className="w-16 h-16 rounded-full bg-bg-base flex items-center justify-center mb-md">
        <Icon name="ShoppingBag" size="lg" className="text-text-primary" />
      </div>

      <h3 className="font-style-large mb-xs">입찰한 상품이 없어요</h3>

      <p className="text-center mb-xl font-style-medium text-text-info">
        마음에 드는 상품에 입찰해보세요!
        <br />
        입찰 성공 시 이곳에서 확인할 수 있어요.
      </p>

      <Button onClick={goHome}>상품 둘러보기</Button>
    </div>
  );
};

export default BidHistoryEmptyState;
