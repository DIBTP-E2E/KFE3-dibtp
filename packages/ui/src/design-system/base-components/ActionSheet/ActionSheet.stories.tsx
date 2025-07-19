import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Button } from '@ui/components';

import ActionSheet from './ActionSheet';

const meta: Meta<typeof ActionSheet> = {
  title: 'Design System/Base Components/ActionSheet',
  component: ActionSheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '액션 리스트를 보여주는 바텀시트 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActionSheet>;

// 상태를 포함한 래퍼 컴포넌트
const ActionSheetWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>액션시트 열기</Button>
      <ActionSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

// 기본 액션시트
export const Default: Story = {
  render: ActionSheetWithState,
  args: {
    title: '옵션 선택',
    items: [
      {
        label: '공유하기',
        onClick: () => console.log('공유하기'),
      },
      {
        label: '수정하기',
        onClick: () => console.log('수정하기'),
      },
      {
        label: '삭제하기',
        variant: 'danger' as const,
        onClick: () => console.log('삭제하기'),
      },
    ],
  },
};

// 제목 없는 액션시트
export const WithoutTitle: Story = {
  render: ActionSheetWithState,
  args: {
    items: [
      {
        label: '카메라로 촬영',
        onClick: () => console.log('카메라'),
      },
      {
        label: '갤러리에서 선택',
        onClick: () => console.log('갤러리'),
      },
    ],
  },
};

// 아이콘 없는 액션시트
export const WithoutIcons: Story = {
  render: ActionSheetWithState,
  args: {
    title: '정렬 옵션',
    items: [
      {
        label: '날짜순',
        onClick: () => console.log('날짜순'),
      },
      {
        label: '이름순',
        onClick: () => console.log('이름순'),
      },
      {
        label: '크기순',
        onClick: () => console.log('크기순'),
      },
    ],
  },
};

// 비활성화된 아이템이 포함된 액션시트
export const WithDisabledItems: Story = {
  render: ActionSheetWithState,
  args: {
    title: '파일 옵션',
    items: [
      {
        label: '다운로드',
        onClick: () => console.log('다운로드'),
      },
      {
        label: '공유하기',
        disabled: true,
        onClick: () => console.log('공유하기'),
      },
      {
        label: '삭제하기',
        variant: 'danger' as const,
        disabled: true,
        onClick: () => console.log('삭제하기'),
      },
    ],
  },
};

// 취소 버튼 없는 액션시트
export const WithoutCancel: Story = {
  render: ActionSheetWithState,
  args: {
    title: '언어 선택',
    showCancel: false,
    items: [
      {
        label: '한국어',
        onClick: () => console.log('한국어'),
      },
      {
        label: 'English',
        onClick: () => console.log('English'),
      },
      {
        label: '日本語',
        onClick: () => console.log('日本語'),
      },
    ],
  },
};

// 긴 리스트 액션시트
export const LongList: Story = {
  render: ActionSheetWithState,
  args: {
    title: '카테고리 선택',
    items: [
      { label: '전자제품', onClick: () => console.log('전자제품') },
      { label: '의류', onClick: () => console.log('의류') },
      { label: '도서', onClick: () => console.log('도서') },
      { label: '가전제품', onClick: () => console.log('가전제품') },
      { label: '스포츠', onClick: () => console.log('스포츠') },
      { label: '뷰티', onClick: () => console.log('뷰티') },
      { label: '식품', onClick: () => console.log('식품') },
      { label: '완구', onClick: () => console.log('완구') },
      { label: '가구', onClick: () => console.log('가구') },
      { label: '자동차용품', onClick: () => console.log('자동차용품') },
    ],
  },
};

// 사용자 프로필 옵션 액션시트
export const UserProfileOptions: Story = {
  render: ActionSheetWithState,
  args: {
    title: '사용자 옵션',
    items: [
      {
        label: '프로필 보기',
        onClick: () => console.log('프로필 보기'),
      },
      {
        label: '메시지 보내기',
        onClick: () => console.log('메시지 보내기'),
      },
      {
        label: '차단하기',
        variant: 'danger' as const,
        onClick: () => console.log('차단하기'),
      },
      {
        label: '신고하기',
        variant: 'danger' as const,
        onClick: () => console.log('신고하기'),
      },
    ],
  },
};

// 상품 옵션 액션시트
export const ProductOptions: Story = {
  render: ActionSheetWithState,
  args: {
    title: '상품 옵션',
    items: [
      {
        label: '수정하기',
        onClick: () => console.log('수정하기'),
      },
      {
        label: '복사하기',
        onClick: () => console.log('복사하기'),
      },
      {
        label: '공유하기',
        onClick: () => console.log('공유하기'),
      },
      {
        label: '삭제하기',
        variant: 'danger' as const,
        onClick: () => console.log('삭제하기'),
      },
    ],
  },
};
