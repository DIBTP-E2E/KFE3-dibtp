import type { ProductStatus } from '@/types/product';

/**
 * 입찰 도메인 타입 정의
 */
export interface Bid {
  bid_id: string;
  product_id: string;
  bidder_user_id: string;
  bid_price: number;
  created_at: string;
}

/**
 * 입찰과 관련 상품 정보를 포함한 확장 타입 (입찰내역 전용)
 */
export interface BidWithProduct extends Bid {
  product: {
    product_id: string;
    title: string;
    start_price: number;
    current_price: number;
    decrease_unit: number;
    status: ProductStatus;
    location_region: string;
    created_at: string;
    auction_started_at?: string;
    images: Array<{
      image_id: string;
      image_url: string;
      is_main: boolean;
    }>;
  };
}
