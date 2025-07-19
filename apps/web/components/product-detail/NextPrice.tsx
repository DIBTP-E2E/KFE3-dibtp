'use client';

import { useCurrentPrice } from '@/hooks/products';

interface NextPriceProps {
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  auctionStartedAt: string;
  decreaseInterval: number;
}

const NextPrice = ({
  startPrice,
  minPrice,
  decreaseUnit,
  auctionStartedAt,
  decreaseInterval,
}: NextPriceProps) => {
  const currentPrice = useCurrentPrice({
    startPrice,
    minPrice,
    decreaseUnit,
    auctionStartedAt,
    decreaseInterval,
  });

  const calculatedNextPrice = currentPrice - decreaseUnit;
  const displayPrice = Math.max(calculatedNextPrice, minPrice);

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg bg-[var(--color-neutral-20)] min-w-[140px]">
      <span className="text-lg font-bold text-[var(--color-neutral-80)]">
        {displayPrice.toLocaleString()}원
      </span>
    </div>
  );
};

export default NextPrice;
