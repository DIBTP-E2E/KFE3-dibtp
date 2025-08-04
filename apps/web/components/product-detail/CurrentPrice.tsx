'use client';

import { useCurrentPrice } from '@web/hooks/products';
import type { ProductStatus } from '@web/types';

interface CurrentPriceProps {
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  status: ProductStatus;
}

const CurrentPrice = ({
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  status,
}: CurrentPriceProps) => {
  const price = useCurrentPrice({
    startPrice,
    minPrice,
    decreaseUnit,
    auctionStartedAt,
    status,
  });

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg min-w-[140px] bg-[var(--color-orange-50)]">
      <span className="text-lg font-bold text-text-primary">{price.toLocaleString()}원</span>
    </div>
  );
};

export default CurrentPrice;
