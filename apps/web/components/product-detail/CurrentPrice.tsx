'use client';

import { useCurrentPrice } from '@web/hooks/products';
import type { ProductStatus } from '@web/types';

interface CurrentPriceProps {
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  status: ProductStatus;
  finalBidPrice?: string;
}

const CurrentPrice = ({
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  status,
  finalBidPrice,
}: CurrentPriceProps) => {
  const displayPrice =
    finalBidPrice !== undefined
      ? parseInt(finalBidPrice)
      : useCurrentPrice({
          startPrice,
          minPrice,
          decreaseUnit,
          auctionStartedAt,
          status,
        });

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg w-full bg-[var(--color-primary-50)]">
      <span className="text-lg font-bold text-text-primary">{displayPrice.toLocaleString()}원</span>
    </div>
  );
};

export default CurrentPrice;
