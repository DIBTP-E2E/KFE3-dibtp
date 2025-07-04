export interface NavigationItem {
  href: string;
  label: string;
  icon: string;
  activeIcon: string;
}

export const BOTTOM_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: '/',
    label: '홈',
    icon: 'Home',
    activeIcon: 'HomeFill',
  },
  {
    href: '/products',
    label: '상품',
    icon: 'ShoppingBag',
    activeIcon: 'ShoppingBagFill',
  },
  {
    href: '/products/register',
    label: '출품',
    icon: 'Export',
    activeIcon: 'ExportFill',
  },
  {
    href: '/chat',
    label: '채팅',
    icon: 'Chat',
    activeIcon: 'ChatFill',
  },
];
