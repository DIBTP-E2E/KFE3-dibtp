import type { Product } from './domain';

// 이전 타입명과의 호환성을 위한 별칭 (점진적 마이그레이션 용도)
export type ProductCreationResponse = ProductCreationAPIResponse;

// 상품리스트의 단일 상품 타입
export interface ProductCardAPIResponse
  extends Pick<
    Product,
    | 'product_id'
    | 'title'
    | 'status'
    | 'view_count'
    | 'created_at'
    | 'region'
    | 'detail_address'
    | 'start_price'
    | 'min_price'
    | 'decrease_unit'
  > {
  image_url: string; // product_images[0]?.image_url에서 추출
  bidder_user_id: string; // 입찰 관련 추가 필드
}

// 상품리스트 API 응답
export type ProductsAPIResponse = ProductCardAPIResponse[];

// 상품 상세 API 응답 (모든 필드 포함)
export type ProductDetailAPIResponse = Product;

// 상품 생성 응답
export interface ProductCreationAPIResponse {
  message: string;
  product_id: string;
}
