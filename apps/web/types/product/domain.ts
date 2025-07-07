// 상품 상태 (schema의 enum 값들)
export type ProductStatus = 'READY' | 'ACTIVE' | 'SOLD' | 'EXPIRED' | 'CANCEL';

// 상품 이미지 도메인 타입 (product_images 테이블)
export interface ProductImage {
  image_id: number;
  product_id: number;
  image_url: string;
  image_order: number;
  created_at: string;
}

// 상품 도메인 타입 (products 테이블)
export interface Product {
  product_id: number;
  title: string;
  description: string;
  start_price: number;
  current_price: number;
  min_price: number;
  decrease_unit: number;
  status: ProductStatus;
  region: string;
  detail_address: string;
  view_count: number;
  created_at: string;
  updated_at: string | null;
  seller_user_id: string;
  product_images: ProductImage[];
}
