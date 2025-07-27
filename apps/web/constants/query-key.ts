// 공통 queryKey 상수
import type { ProductStatus } from '@web/types';

// 사용자 지역 관련
export const MY_INFO_QUERY_KEY = ['my-info'] as const;

// 유저 정보 관련
export const USER_INFO_QUERY_KEY = (userId: string) => ['user-info', userId] as const;

// 사용자 상품 관련
export const MY_PRODUCTS_QUERY_KEY = {
  ALL: ['my-products'] as const,
  BY_STATUS: (status?: ProductStatus) => ['my-products', status] as const,
};

// 사용자 입찰 관련
export const BID_HISTORY_QUERY_KEY = ['bid-history'] as const;
