'use client';

import { toast } from '@repo/ui/utils';

import { PAGE_ROUTES } from '@/constants/routes';

import MypageMenuItem, { type MypageMenuItemProps } from './MypageMenuItem';
import MypageSectionCard from './MypageSectionCard';

const SettingsMenu = () => {
  const settingsMenuItems: MypageMenuItemProps[] = [
    {
      icon: 'Location',
      title: '위치 설정',
      href: PAGE_ROUTES.LOCATION,
    },
    {
      icon: 'Bell',
      title: '알림 설정',
      onClick: () => toast.warning('준비중입니다!'),
    },
    {
      icon: 'User',
      title: '계정 설정',
      onClick: () => toast.warning('준비중입니다!'),
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
