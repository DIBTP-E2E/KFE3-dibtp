
import BidButton from './BidButton';

interface ProductFooterProps {
  currentPrice: number;
}

const ProductFooter = ({ currentPrice }: ProductFooterProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-white p-4 border-t border-gray-200 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900">{currentPrice.toLocaleString()}원</span>
        <span className="text-xs text-gray-500 mt-1">가격 인하까지</span>
      </div>
      <BidButton />
    </div>
  );
};

export default ProductFooter;
