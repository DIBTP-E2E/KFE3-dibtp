import { PRODUCT_STATUS_VALUES, PRODUCT_STATUS } from '@/constants';
import type {
  ProductStatus,
  ProductImage,
  ProductCardAPIResponse,
  ProductDetailAPIResponse,
} from '@/types';

// Prisma 결과 타입 정의
interface PrismaProductCard {
  product_id: bigint;
  title: string;
  status: string;
  view_count: number;
  created_at: Date;
  region: string;
  detail_address: string;
  start_price: { toNumber(): number };
  min_price: { toNumber(): number };
  decrease_unit: { toNumber(): number };
  product_images: Array<{
    image_url: string;
    image_order: number;
  }> | null;
  bids: {
    bidder_user_id: string;
  } | null;
}

interface PrismaProductDetail {
  product_id: bigint;
  title: string;
  description: string;
  start_price: { toNumber(): number };
  min_price: { toNumber(): number };
  decrease_unit: { toNumber(): number };
  status: string;
  region: string;
  detail_address: string;
  view_count: number;
  created_at: Date;
  updated_at: Date | null;
  seller_user_id: string;
  product_images: Array<{
    image_id: bigint;
    product_id: bigint;
    image_url: string;
    image_order: number;
    created_at: Date;
  }>;
}

// 타입 가드 함수
export const isValidProductStatus = (status: string): status is ProductStatus => {
  return PRODUCT_STATUS_VALUES.includes(status as ProductStatus);
};

// Prisma 결과를 API 응답 형태로 변환하는 함수들
export const convertToProductCardResponse = (
  product: PrismaProductCard
): ProductCardAPIResponse => {
  return {
    product_id: parseInt(product.product_id.toString()),
    title: product.title,
    image_url: product.product_images?.length ? (product.product_images[0]?.image_url ?? '') : '',
    status: isValidProductStatus(product.status) ? product.status : PRODUCT_STATUS.ACTIVE,
    view_count: product.view_count,
    created_at: product.created_at.toISOString(),
    region: product.region,
    detail_address: product.detail_address,
    bidder_user_id: product.bids?.bidder_user_id ?? '',
    start_price: product.start_price.toNumber(),
    min_price: product.min_price.toNumber(),
    decrease_unit: product.decrease_unit.toNumber(),
  };
};

export const convertToProductDetailResponse = (
  product: PrismaProductDetail
): ProductDetailAPIResponse => {
  return {
    product_id: parseInt(product.product_id.toString()),
    title: product.title,
    description: product.description,
    start_price: product.start_price.toNumber(),
    min_price: product.min_price.toNumber(),
    decrease_unit: product.decrease_unit.toNumber(),
    status: isValidProductStatus(product.status) ? product.status : PRODUCT_STATUS.ACTIVE,
    region: product.region,
    detail_address: product.detail_address,
    view_count: product.view_count,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at?.toISOString() ?? product.created_at.toISOString(),
    seller_user_id: product.seller_user_id,
    product_images: product.product_images.map(
      (img): ProductImage => ({
        image_id: parseInt(img.image_id.toString()),
        product_id: parseInt(img.product_id.toString()),
        image_url: img.image_url,
        image_order: img.image_order,
        created_at: img.created_at.toISOString(),
      })
    ),
  };
};
