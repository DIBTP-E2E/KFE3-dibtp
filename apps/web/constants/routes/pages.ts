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
    INDEX: '/chat',
    LIST: '/chat/rooms',
    LIST_BY_PRODUCT: (productId: string | number) => `/chat/rooms?productId=${productId}`,
    ROOM: (chatRoomId: string | number) => `/chat/${chatRoomId}`,
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
