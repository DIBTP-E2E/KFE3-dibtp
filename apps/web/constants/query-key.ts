// 공통 queryKey 상수
import type { ProductStatus } from '@web/types';

// 사용자 전역 정보 prefetch하는 데이터 관련
export const MY_INFO_QUERY_KEY = ['my-info'] as const;

// 사용자 상품 관련
export const MY_PRODUCTS_QUERY_KEY = {
  all: () => ['my-products'] as const,
  byStatus: (status?: ProductStatus) => ['my-products', status] as const,
} as const;

// 채팅 관련
export const CHAT_ROOM_QUERY_KEY = {
  ALL: (userId: string) => ['chat', 'rooms', userId] as const,
  LIST_ALL: (userId: string) => [...CHAT_ROOM_QUERY_KEY.ALL(userId), 'list'] as const,
  LIST_BY_PRODUCT: (userId: string, productId: number) =>
    [...CHAT_ROOM_QUERY_KEY.ALL(userId), 'list', 'product', productId] as const,
  DETAIL: (userId: string, chatRoomId: string) =>
    [...CHAT_ROOM_QUERY_KEY.ALL(userId), 'detail', chatRoomId] as const,
  MESSAGES: (userId: string, chatRoomId: string) =>
    [...CHAT_ROOM_QUERY_KEY.ALL(userId), 'messages', chatRoomId] as const,
} as const;
