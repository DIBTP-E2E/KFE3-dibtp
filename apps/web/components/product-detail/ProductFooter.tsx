import { Timer } from '../shared';

import BidButton from './BidButton';

interface ProductFooterProps {
  productId: number;
  currentPrice: number;
  minPrice: number;
  createdAt: string;
}

const ProductFooter = ({ productId, currentPrice, minPrice, createdAt }: ProductFooterProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:max-w-container bg-white p-4 border-t border-gray-200 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900">{currentPrice.toLocaleString()}원</span>
        <div className="flex items-center gap-x-1 text-xs text-gray-500 mt-1">
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
