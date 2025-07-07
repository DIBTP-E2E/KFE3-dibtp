import type { Product } from './domain';

// API 응답 타입들
export interface ProductCard
  extends Pick<
    Product,
    'product_id' | 'title' | 'current_price' | 'status' | 'view_count' | 'created_at' | 'region'
  > {
  image_url: string; // product_images[0]?.image_url에서 추출
  bidder_user_id: string; // 입찰 관련 추가 필드
}

// 완전한 상품 API 응답 (모든 필드 포함)
export type ProductDetail = Product;

// 상품 생성 응답
export interface ProductCreationResponse {
  message: string;
  product_id: string;
}
