import { PRODUCT_STATUS, PRODUCT_STATUS_VALUES } from '@web/constants';
import type { BidWithProduct, BidHistoryResponse, ProductStatus } from '@web/types';

// Prisma 결과 타입 정의
interface PrismaBidWithProduct {
  bid_id: bigint;
  product_id: bigint;
  bidder_user_id: string;
  bid_price: { toNumber(): number } | number | bigint;
  created_at: Date;
  products: {
    product_id: bigint;
    title: string;
    description: string;
    start_price: { toNumber(): number } | number | bigint;
    current_price?: { toNumber(): number } | number | bigint;
    decrease_unit: { toNumber(): number } | number | bigint;
    status: string;
    region: string;
    detail_address: string;
    view_count: number;
    created_at: Date;
    updated_at: Date | null;
    seller_user_id: string;
    auction_started_at: Date | null;
    product_images: Array<{
      image_id: bigint;
      image_url: string;
      image_order: number;
    }>;
  };
}

// 타입 가드 함수
const isValidProductStatus = (status: string): status is ProductStatus => {
  return PRODUCT_STATUS_VALUES.includes(status as ProductStatus);
};

// 단일 Bid 변환 함수
const convertToBidWithProduct = (bid: PrismaBidWithProduct): BidWithProduct => {
  return {
    bid_id: bid.bid_id.toString(),
    product_id: bid.product_id.toString(),
    bidder_user_id: bid.bidder_user_id,
    bid_price:
      typeof bid.bid_price === 'number'
        ? bid.bid_price
        : typeof bid.bid_price === 'bigint'
          ? Number(bid.bid_price)
          : bid.bid_price.toNumber(),
    created_at: bid.created_at.toISOString(),
    product: {
      product_id: bid.products.product_id.toString(),
      title: bid.products.title,
      start_price:
        typeof bid.products.start_price === 'number'
          ? bid.products.start_price
          : typeof bid.products.start_price === 'bigint'
            ? Number(bid.products.start_price)
            : bid.products.start_price.toNumber(),
      current_price: bid.products.current_price
        ? typeof bid.products.current_price === 'number'
          ? bid.products.current_price
          : typeof bid.products.current_price === 'bigint'
            ? Number(bid.products.current_price)
            : bid.products.current_price.toNumber()
        : 0,
      decrease_unit:
        typeof bid.products.decrease_unit === 'number'
          ? bid.products.decrease_unit
          : typeof bid.products.decrease_unit === 'bigint'
            ? Number(bid.products.decrease_unit)
            : bid.products.decrease_unit.toNumber(),
      status: isValidProductStatus(bid.products.status)
        ? bid.products.status
        : PRODUCT_STATUS.ACTIVE,
      location_region: bid.products.region,
      created_at: bid.products.created_at.toISOString(),
      auction_started_at: bid.products.auction_started_at?.toISOString(),
      images: bid.products.product_images.map((image) => ({
        image_id: image.image_id.toString(),
        image_url: image.image_url,
        is_main: image.image_order === 0, // 첫 번째 이미지를 메인으로 처리
      })),
    },
  };
};

// 입찰 내역 목록 변환 함수
export const convertToBidHistoryResponse = (bids: PrismaBidWithProduct[]): BidHistoryResponse => {
  return {
    bids: bids.map(convertToBidWithProduct),
  };
};
