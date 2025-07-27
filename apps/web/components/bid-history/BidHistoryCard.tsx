'use client';

import type { BidWithProduct } from '@web/types';
import { formatDate } from '@web/utils/date';

import ProductCard from '../products/ProductCard';

interface BidHistoryCardProps {
  bid: BidWithProduct;
}

const BidHistoryCard = ({ bid }: BidHistoryCardProps) => {
  const { product } = bid;

  if (!product) return null;

  const mainImage = product.images?.[0];

  return (
    <div className="relative">
      <ProductCard
        productId={Number(product.product_id)}
        imgUrl={mainImage?.image_url || ''}
        title={product.title}
        startPrice={product.start_price}
        minPrice={bid.bid_price}
        decreaseUnit={product.decrease_unit}
        auctionStartedAt={product.auction_started_at || product.created_at}
        status={product.status}
        createdAt={product.created_at}
        region={product.location_region}
        isShowProductBadge={false}
      />

      {/* 입찰 시간 */}
      <div className="absolute bottom-0 right-0 z-10 bg-bg-dark/70 rounded px-xs">
        <span className="text-xs text-text-inverse">{formatDate(bid.created_at)} 낙찰</span>
      </div>
    </div>
  );
};

export default BidHistoryCard;
