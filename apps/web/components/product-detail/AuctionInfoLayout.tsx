'use client';

import { useCurrentPrice } from '@/hooks/products';

import { Timer } from '../shared';

import AuctionSummary from './AuctionSummary';
import CurrentPrice from './CurrentPrice';
import NextPrice from './NextPrice';

interface AuctionInfoLayoutProps {
  decreaseUnit: number;
  startPrice: number;
  minPrice: number;
  startedAt: string;
  status: 'ACTIVE' | 'SOLD' | 'CANCEL';
}

const AuctionInfoLayout = ({
  decreaseUnit,
  startPrice,
  minPrice,
  startedAt,
  status,
}: AuctionInfoLayoutProps) => {
  const currentPrice = useCurrentPrice({
    startPrice,
    minPrice,
    decreaseUnit,
    auctionStartedAt: startedAt,
    status,
  });

  return (
    <>
      <div className="mt-4 flex justify-between items-center gap-4">
        <div className="flex flex-col items-center flex-1 gap-y-0.5">
          <span className="text-xs text-text-info font-bold">현재 가격</span>
          <CurrentPrice
            startPrice={startPrice}
            minPrice={minPrice}
            decreaseUnit={decreaseUnit}
            auctionStartedAt={startedAt}
            status={status}
          />
        </div>
        <div className="flex flex-col items-center flex-1 gap-y-0.5">
          <div className="flex items-center gap-x-1">
            <Timer
              startTime={startedAt}
              currentPrice={currentPrice}
              minPrice={minPrice}
              status={status}
              className="text-xs text-text-primary font-bold"
            />
            <span className="text-xs text-text-info font-bold">뒤 인하</span>
          </div>
          <NextPrice
            startPrice={startPrice}
            minPrice={minPrice}
            decreaseUnit={decreaseUnit}
            auctionStartedAt={startedAt}
            status={status}
          />
        </div>
      </div>
      <div className="mt-4">
        <AuctionSummary startPrice={startPrice} decreaseUnit={decreaseUnit} minPrice={minPrice} />
      </div>
    </>
  );
};

export default AuctionInfoLayout;
