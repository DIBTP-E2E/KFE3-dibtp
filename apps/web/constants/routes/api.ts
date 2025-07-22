const API_BASE = '/api';

export const API_ROUTES = {
  PRODUCTS: `${API_BASE}/products`,
  IMAGES: `${API_BASE}/images`,
  BIDS: `${API_BASE}/bids`,
  USER: `${API_BASE}/user`,
  FAVORITES: `${API_BASE}/favorites`,
  CHAT_ROOMS: `${API_BASE}/chat/rooms`,
} as const;
