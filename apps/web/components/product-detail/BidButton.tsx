'use client';

import { Button, toast } from '@repo/ui/components';

import { SkeletonBox } from '@web/components/shared';
import { PRODUCT_STATUS, API_ROUTES } from '@web/constants';
import type { ProductStatus } from '@web/types';

interface BidButtonProps {
  productId: number;
  currentPrice: number;
  status: ProductStatus;
  isSeller: boolean;
  isMyInfoLoading: boolean;
}

const BidButton = ({
  productId,
  currentPrice,
  status,
  isSeller,
  isMyInfoLoading,
}: BidButtonProps) => {
  const handleBid = async () => {
    const isConfirmed = confirm(`${currentPrice.toLocaleString()}원에 입찰하시겠습니까?`);

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(API_ROUTES.BIDS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId.toString(),
          bidPrice: currentPrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '입찰에 실패했습니다.');
      }

      toast.success('입찰에 성공했습니다!');
      window.location.reload();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('입찰 실패:', error);
      }

      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      toast.error(errorMessage);
    }
  };

  if (isMyInfoLoading) {
    return <SkeletonBox className="w-[120px] h-[48px] rounded-md" />;
  }

  return (
    <Button
      onClick={handleBid}
      isFullWidth={false}
      size="lg"
      isDisabled={status !== PRODUCT_STATUS.ACTIVE || isSeller}
    >
      입찰하기
    </Button>
  );
};

export default BidButton;
