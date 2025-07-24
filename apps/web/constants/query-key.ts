// 공통 queryKey 상수
import type { ProductStatus } from '@web/types';

// 사용자 지역 관련
export const MY_INFO_QUERY_KEY = ['my-info'] as const;

// 유저 정보 관련
export const USER_INFO_QUERY_KEY = (userId: string) => ['user-info', userId] as const;

// 사용자 상품 관련
export const MY_PRODUCTS_QUERY_KEY = {
  all: () => ['my-products'] as const,
  byStatus: (status?: ProductStatus) => ['my-products', status] as const,
};
