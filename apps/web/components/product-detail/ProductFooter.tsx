'use client';

import { Timer } from '@web/components/shared';
import { PRODUCT_STATUS } from '@web/constants';

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
  isSeller: boolean;
  finalBidPrice?: string;
}

const ProductFooter = ({
  productId,
  startPrice,
  minPrice,
  decreaseUnit,
  startedAt,
  status,
  isSeller,
  finalBidPrice,
}: ProductFooterProps) => {
  const displayPrice =
    finalBidPrice !== undefined
      ? parseInt(finalBidPrice)
      : useCurrentPrice({
          startPrice,
          minPrice,
          decreaseUnit,
          auctionStartedAt: startedAt,
          status,
        });

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:max-w-container bg-white p-4 border-t border-gray-200 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900">{displayPrice.toLocaleString()}원</span>
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
      />
    </div>
  );
};

export default ProductFooter;
