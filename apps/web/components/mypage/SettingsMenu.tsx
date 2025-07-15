import MypageMenuItem, { type MypageMenuItemProps } from './MypageMenuItem';
import MypageSectionCard from './MypageSectionCard';

const SettingsMenu = () => {
  const settingsMenuItems: MypageMenuItemProps[] = [
    {
      icon: 'Location',
      title: '위치 설정',
      href: '/location',
    },
    {
      icon: 'Bell',
      title: '알림 설정',
      href: '/mypage/notifications',
    },
    {
      icon: 'User',
      title: '계정 설정',
      href: '/mypage/settings',
    },
  ];

  return (
    <MypageSectionCard title="설정">
      {settingsMenuItems.map((item, index) => (
        <MypageMenuItem key={index} {...item} />
      ))}
    </MypageSectionCard>
  );
};

export default SettingsMenu;
