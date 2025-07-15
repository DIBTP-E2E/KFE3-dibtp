import { PAGE_ROUTES } from './routes';

interface NavigationItem {
  href: string;
  label: string;
  icon: string;
  activeIcon: string;
}

export const BOTTOM_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: PAGE_ROUTES.HOME,
    label: '홈',
    icon: 'Home',
    activeIcon: 'HomeFill',
  },
  {
    href: PAGE_ROUTES.PRODUCTS.REGISTER,
    label: '출품',
    icon: 'Export',
    activeIcon: 'ExportFill',
  },
  {
    href: PAGE_ROUTES.CHAT.LIST,
    label: '채팅',
    icon: 'Chat',
    activeIcon: 'ChatFill',
  },
  {
    href: '/mypage',
    label: '마이페이지',
    icon: 'User',
    activeIcon: 'UserFill',
  },
];
