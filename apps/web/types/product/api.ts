export interface ProductCreationResponse {
  message: string;
  product_id: string;
}

export interface ProductsAPIResponse {
  product_id: number;
  title: string;
  image_url: string;
  current_price: number;
  status: ProductStatus;
  view_count: number;
  created_at: string;
  region: string;
  bidder_user_id: string;
}

type ProductStatus = 'READY' | 'ACTIVE' | 'SOLD' | 'EXPIRED' | 'CANCEL';

export interface ProductAPIResponse {
  product_id: number;
  title: string;
  image_url: string;
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
