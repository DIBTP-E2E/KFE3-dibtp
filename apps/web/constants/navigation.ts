export interface NavigationItem {
  href: string;
  label: string;
  icon: string;
  activeIcon: string;
}

// 추후 메뉴별 정보에 접근 가능하도록 객체로 바꿀 예정
export const BOTTOM_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: '/',
    label: '홈',
    icon: 'Home',
    activeIcon: 'HomeFill',
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
