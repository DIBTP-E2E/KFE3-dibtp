'use client';

import { useCurrentPrice } from '@/hooks/products';

import { Timer } from '../shared';

import BidButton from './BidButton';

interface ProductFooterProps {
  productId: number;
  startPrice: number;
  minPrice: number;
  decreaseUnit: number;
  createdAt: string;
}

const ProductFooter = ({
  productId,
  startPrice,
  minPrice,
  decreaseUnit,
  createdAt,
}: ProductFooterProps) => {
  const currentPrice = useCurrentPrice({
    startPrice,
    minPrice,
    decreaseUnit,
    auctionStartedAt: createdAt,
  });

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:max-w-container bg-white p-4 border-t border-gray-200 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900">{currentPrice.toLocaleString()}원</span>
        <div className="flex items-center gap-x-1 text-xs text-text-info mt-1">
          <span>가격 인하까지</span>
          <Timer
            startTime={createdAt}
            currentPrice={currentPrice}
            minPrice={minPrice}
            className="text-xs text-text-primary"
          />
        </div>
      </div>
      <BidButton productId={productId} currentPrice={currentPrice} />
    </div>
  );
};

export default ProductFooter;
