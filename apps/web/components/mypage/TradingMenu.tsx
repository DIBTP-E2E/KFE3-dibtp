import { PAGE_ROUTES } from '@/constants/routes';

import MypageMenuItem, { type MypageMenuItemProps } from './MypageMenuItem';
import MypageSectionCard from './MypageSectionCard';

const TradingMenu = () => {
  const tradingMenuItems: MypageMenuItemProps[] = [
    {
      icon: 'Export',
      title: '출품내역',
      href: PAGE_ROUTES.MYPAGE.SALES,
    },
    {
      icon: 'ShoppingBag',
      title: '낙찰내역',
      href: PAGE_ROUTES.MYPAGE.BIDS,
    },
    {
      icon: 'Heart',
      title: '관심목록',
      href: PAGE_ROUTES.MYPAGE.FAVORITES,
    },
  ];

  return (
    <MypageSectionCard title="거래 관리">
      {tradingMenuItems.map((item, index) => (
        <MypageMenuItem key={index} {...item} />
      ))}
    </MypageSectionCard>
  );
};

export default TradingMenu;
