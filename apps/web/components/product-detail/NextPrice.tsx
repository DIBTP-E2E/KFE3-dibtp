'use client';

import { PRODUCT_STATUS } from '@web/constants';
import { useCurrentPrice } from '@web/hooks/products';
import type { ProductStatus } from '@web/types';

interface NextPriceProps {
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  status: ProductStatus;
}

const NextPrice = ({
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  status,
}: NextPriceProps) => {
  const currentPrice = useCurrentPrice({
    startPrice,
    minPrice,
    decreaseUnit,
    auctionStartedAt,
    status,
  });

  const calculatedNextPrice = currentPrice - decreaseUnit;
  const displayPrice = Math.max(calculatedNextPrice, minPrice);

  const priceText = status === PRODUCT_STATUS.ACTIVE ? `${displayPrice.toLocaleString()}원` : '-';

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg bg-[var(--color-neutral-20)] w-full">
      <span className="text-lg font-bold text-[var(--color-neutral-80)]">{priceText}</span>
    </div>
  );
};

export default NextPrice;
