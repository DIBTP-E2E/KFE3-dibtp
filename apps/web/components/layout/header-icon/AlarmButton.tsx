'use client';

import { toast } from '@repo/ui/utils';

import HeaderIconButton from './HeaderIconButton';

const AlarmButton = () => {
  return (
    <HeaderIconButton
      iconName="Bell"
      ariaLabel="알람 확인하기"
      onClick={() => toast.warning('준비중입니다!')}
    />
  );
};

export default AlarmButton;
