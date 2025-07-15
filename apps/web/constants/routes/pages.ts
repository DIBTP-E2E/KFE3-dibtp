export const PAGE_ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },

  LOCATION: '/location',

  PRODUCTS: {
    LIST: '/products',
    REGISTER: '/products/register',
    DETAIL: (productId: string) => `/products/${productId}`,
  },

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
    PURCHASES: '/mypage/purchases',
    FAVORITES: '/mypage/favorites',
  },
} as const;
