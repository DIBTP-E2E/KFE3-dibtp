export const PAGE_ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },

  LOCATION: '/location',

  PRODUCTS: {
    REGISTER: '/products/register',
    DETAIL: (productId: string) => `/products/${productId}`,
    EDIT: (productId: string) => `/products/${productId}/edit`,
  },

  SEARCH: (keyword: string) => `/search?keyword=${keyword}`,

  CHAT: {
    LIST: '/chat',
    ROOM: (chatId: string) => `/chat/${chatId}`,
  },

  MYPAGE: {
    INDEX: '/mypage',
    PROFILE: '/mypage/profile',
    NOTIFICATIONS: '/mypage/notifications',
    ACCOUNT: '/mypage/account',
    SALES: '/mypage/sales',
    BIDS: '/mypage/bids',
    FAVORITES: '/mypage/favorites',
  },
} as const;
