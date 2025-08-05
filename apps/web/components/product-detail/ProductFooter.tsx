'use client';

import { Timer } from '@web/components/shared';
import { PRODUCT_STATUS } from '@web/constants';

import { useMyInfo } from '@web/hooks/my-info/useMyInfo';
import { useCurrentPrice } from '@web/hooks/products';
import type { ProductStatus } from '@web/types';

import BidButton from './BidButton';

interface ProductFooterProps {
  productId: number;
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  startedAt: string;
  status: ProductStatus;
  sellerUserId: string;
  finalBidPrice?: string | null;
}

const ProductFooter = ({
  productId,
  startPrice,
  minPrice,
  decreaseUnit,
  startedAt,
  status,
  sellerUserId,
  finalBidPrice,
}: ProductFooterProps) => {
  const { userId, isLoading: isMyInfoLoading } = useMyInfo();
  const currentUserId = userId || null;

  const isSeller = currentUserId === sellerUserId;
  const displayPrice = finalBidPrice
    ? parseInt(finalBidPrice)
    : useCurrentPrice({
        startPrice,
        minPrice,
        decreaseUnit,
        auctionStartedAt: startedAt,
        status,
      });

  return (
    <section className="h-bottom-nav w-full md:max-w-container px-container bg-bg-light border-t border-border-base flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-xl font-bold">{displayPrice.toLocaleString()}원</span>
        <div className="flex items-center gap-x-1 text-xs text-text-info mt-1">
          {status === PRODUCT_STATUS.SOLD ? (
            <span className="text-xs text-text-error font-bold">경매가 종료되었습니다.</span>
          ) : status === PRODUCT_STATUS.CANCEL ? (
            <span className="text-xs text-text-info font-bold">경매가 중지되었습니다.</span>
          ) : displayPrice === minPrice ? (
            <span className="text-xs text-text-primary font-bold">하한가에 도달했습니다.</span>
          ) : (
            <>
              <span>가격 인하까지</span>
              <Timer
                startTime={startedAt}
                currentPrice={displayPrice}
                minPrice={minPrice}
                status={status}
                className="text-xs text-text-primary"
              />
            </>
          )}
        </div>
      </div>

      <BidButton
        productId={productId}
        currentPrice={displayPrice}
        status={status}
        isSeller={isSeller}
        isMyInfoLoading={isMyInfoLoading}
      />
    </section>
  );
};

export default ProductFooter;
