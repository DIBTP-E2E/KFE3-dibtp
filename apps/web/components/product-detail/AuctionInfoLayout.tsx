'use client';

import { Timer } from '@web/components/shared';
import { PRODUCT_STATUS } from '@web/constants';
import { useCurrentPrice } from '@web/hooks/products';

import { ProductStatus } from '@web/types';

import AuctionSummary from './AuctionSummary';
import CurrentPrice from './CurrentPrice';
import NextPrice from './NextPrice';

interface AuctionInfoLayoutProps {
  decreaseUnit: number;
  startPrice: number;
  minPrice: number;
  startedAt: string;
  status: ProductStatus;
  finalBidPrice?: string;
}

const AuctionInfoLayout = ({
  decreaseUnit,
  startPrice,
  minPrice,
  startedAt,
  status,
  finalBidPrice,
}: AuctionInfoLayoutProps) => {
  const currentPrice = useCurrentPrice({
    startPrice,
    minPrice,
    decreaseUnit,
    auctionStartedAt: startedAt,
    status,
  });

  return (
    <section className="flex flex-col gap-container">
      <h2 className="sr-only">가격 정보</h2>

      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col items-center flex-1 gap-y-xs">
          <span className="text-xs text-text-info font-bold">현재 가격</span>
          <CurrentPrice
            startPrice={startPrice}
            minPrice={minPrice}
            decreaseUnit={decreaseUnit}
            auctionStartedAt={startedAt}
            status={status}
            finalBidPrice={finalBidPrice}
          />
        </div>
        <div className="flex flex-col items-center flex-1 gap-y-xs">
          <div className="flex items-center gap-x-1">
            {status === PRODUCT_STATUS.SOLD ? (
              <span className="text-xs text-text-error font-bold">경매 종료</span>
            ) : status === PRODUCT_STATUS.CANCEL ? (
              <span className="text-xs text-text-info font-bold">경매 중지</span>
            ) : currentPrice === minPrice ? (
              <span className="text-xs text-text-primary font-bold">하한가 도달</span>
            ) : (
              <>
                <Timer
                  startTime={startedAt}
                  currentPrice={currentPrice}
                  minPrice={minPrice}
                  status={status}
                  className="text-xs text-text-primary font-bold"
                />
                <span className="text-xs text-text-info font-bold">뒤 인하</span>
              </>
            )}
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

      <AuctionSummary startPrice={startPrice} decreaseUnit={decreaseUnit} minPrice={minPrice} />
    </section>
  );
};

export default AuctionInfoLayout;
