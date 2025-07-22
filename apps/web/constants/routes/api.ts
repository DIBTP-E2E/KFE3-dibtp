const API_BASE = '/api';

export const API_ROUTES = {
  // 상품 관련 엔드포인트
  PRODUCTS: `${API_BASE}/products`,
  MY_PRODUCTS: `${API_BASE}/products/my`,
  PRODUCT_STATUS: `${API_BASE}/products/status`,
  PRODUCT_BY_ID: (productId: number) => `${API_BASE}/products/${productId}`,

  // 기타 엔드포인트
  IMAGES: `${API_BASE}/images`,
  BIDS: `${API_BASE}/bids`,
  FAVORITES: `${API_BASE}/favorites`,
  CHAT_ROOMS: `${API_BASE}/chat/rooms`,
  MY_INFO: `${API_BASE}/my-info`,
} as const;
