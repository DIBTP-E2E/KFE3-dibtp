import CurrentPrice from './CurrentPrice';
import NextPrice from './NextPrice';
import AuctionSummary from './AuctionSummary';

interface AuctionInfoLayoutProps {
  currentPrice: number;
  decreaseUnit: number;
  startPrice: number;
  minPrice: number;
}

const AuctionInfoLayout = ({
  currentPrice,
  decreaseUnit,
  startPrice,
  minPrice,
}: AuctionInfoLayoutProps) => {
  return (
    <>
      <div className="mt-4 flex justify-between items-center gap-4">
        <div className="flex flex-col items-center flex-1 gap-y-0.5">
          <span className="text-xs text-gray-500 font-bold">현재 가격</span>
          <CurrentPrice price={currentPrice} />
        </div>
        <div className="flex flex-col items-center flex-1 gap-y-0.5">
          <span className="text-xs text-gray-500 font-bold">다음 인하가</span>
          <NextPrice currentPrice={currentPrice} decreaseUnit={decreaseUnit} />
        </div>
      </div>
      <div className="mt-4">
        <AuctionSummary startPrice={startPrice} decreaseUnit={decreaseUnit} minPrice={minPrice} />
      </div>
    </>
  );
};

export default AuctionInfoLayout;
