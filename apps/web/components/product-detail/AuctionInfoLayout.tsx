import { Timer } from '../shared';
import CurrentPrice from './CurrentPrice';
import NextPrice from './NextPrice';
import AuctionSummary from './AuctionSummary';

interface AuctionInfoLayoutProps {
  currentPrice: number;
  decreaseUnit: number;
  startPrice: number;
  minPrice: number;
  createdAt: string;
}

const AuctionInfoLayout = ({
  currentPrice,
  decreaseUnit,
  startPrice,
  minPrice,
  createdAt,
}: AuctionInfoLayoutProps) => {
  return (
    <>
      <div className="mt-4 flex justify-between items-center gap-4">
        <div className="flex flex-col items-center flex-1 gap-y-0.5">
          <span className="text-xs text-gray-500 font-bold">현재 가격</span>
          <CurrentPrice price={currentPrice} />
        </div>
        <div className="flex flex-col items-center flex-1 gap-y-0.5">
          <div className="flex items-center gap-x-1">
            <Timer
              startTime={createdAt}
              currentPrice={currentPrice}
              minPrice={minPrice}
              className="text-xs text-text-primary font-bold"
            />
            <span className="text-xs text-gray-500 font-bold">뒤 인하</span>
          </div>
          <NextPrice currentPrice={currentPrice} decreaseUnit={decreaseUnit} minPrice={minPrice} />
        </div>
      </div>
      <div className="mt-4">
        <AuctionSummary startPrice={startPrice} decreaseUnit={decreaseUnit} minPrice={minPrice} />
      </div>
    </>
  );
};

export default AuctionInfoLayout;
