export interface ProductCreationResponse {
  message: string;
  product_id: string;
}

export type ProductStatusSchema = 'READY' | 'ACTIVE' | 'SOLD' | 'EXPIRED' | 'CANCEL';
export type ProductBadgeStatus = ProductStatusSchema; // 입찰 기능 완료시 Exclude<ProductStatus, 'SOLD'> | 'SUCCESS' 로 수정

export interface ProductCardSchema {
  product_id: number;
  title: string;
  image_url: string;
  current_price: number;
  status: ProductBadgeStatus;
  view_count: number;
  created_at: string;
  region: string;
  bidder_user_id: string;
}

export type ProductsAPIResponse = ProductCardSchema[];

export interface ProductAPIResponse {
  product_id: number;
  title: string;
  image_url: string;
  description: string;
  start_price: number;
  current_price: number;
  min_price: number;
  decrease_unit: number;
  status: ProductStatusSchema;
  region: string;
  detail_address: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  seller_user_id: string;
  product_images: ProductImage[];
}

export interface ProductImage {
  image_id: number;
  product_id: number;
  image_url: string;
  image_order: number;
  created_at: string;
  //   updated_at: string;
}
