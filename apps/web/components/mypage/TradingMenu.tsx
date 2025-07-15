import ProfileMenuItem, { type ProfileMenuItemProps } from './MypageMenuItem';
import MypageSectionCard from './MypageSectionCard';

const TradingMenu = () => {
  const tradingMenuItems: ProfileMenuItemProps[] = [
    {
      icon: 'Export',
      title: '판매내역',
      href: '/mypage/sales',
    },
    {
      icon: 'ShoppingBag',
      title: '구매내역',
      href: '/mypage/purchases',
    },
    {
      icon: 'Heart',
      title: '관심목록',
      href: '/mypage/favorites',
    },
  ];

  return (
    <MypageSectionCard title="거래 관리">
      {tradingMenuItems.map((item, index) => (
        <ProfileMenuItem key={index} {...item} />
      ))}
    </MypageSectionCard>
  );
};

export default TradingMenu;
