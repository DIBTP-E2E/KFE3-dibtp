import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Button } from '@ui/components';

import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Design System/Base Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '화면 하단에서 슬라이드업되는 바텀시트 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// 상태를 포함한 래퍼 컴포넌트
const BottomSheetWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
      <BottomSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

// 기본 바텀시트
export const Default: Story = {
  render: BottomSheetWithState,
  args: {
    title: '바텀시트 제목',
    children: (
      <div className="space-y-4">
        <p>바텀시트 내용입니다.</p>
        <Button size="md">확인</Button>
      </div>
    ),
  },
};

// 제목 없는 바텀시트
export const WithoutTitle: Story = {
  render: BottomSheetWithState,
  args: {
    children: (
      <div className="space-y-4">
        <h3 className="font-style-large text-text-base">사용자 정의 제목</h3>
        <p>제목 없는 바텀시트입니다.</p>
        <Button size="md">확인</Button>
      </div>
    ),
  },
};

// 핸들 없는 바텀시트
export const WithoutHandle: Story = {
  render: BottomSheetWithState,
  args: {
    title: '핸들 없는 바텀시트',
    showHandle: false,
    children: (
      <div className="space-y-4">
        <p>핸들이 없는 바텀시트입니다.</p>
        <Button size="md">확인</Button>
      </div>
    ),
  },
};

// 전체 높이 바텀시트
export const FullHeight: Story = {
  render: BottomSheetWithState,
  args: {
    title: '전체 높이 바텀시트',
    height: 'full',
    children: (
      <div className="space-y-4">
        <p>전체 높이를 차지하는 바텀시트입니다.</p>
        <div className="space-y-2">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-3 bg-bg-base rounded-lg">
              리스트 아이템 {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

// 커스텀 높이 바텀시트
export const CustomHeight: Story = {
  render: BottomSheetWithState,
  args: {
    title: '커스텀 높이 바텀시트',
    height: 400,
    children: (
      <div className="space-y-4">
        <p>400px 높이의 바텀시트입니다.</p>
        <div className="space-y-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="p-3 bg-bg-base rounded-lg">
              리스트 아이템 {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

// 백드롭 클릭 방지 바텀시트
export const PreventBackdropClose: Story = {
  render: BottomSheetWithState,
  args: {
    title: '백드롭 클릭 방지',
    preventBackdropClose: true,
    children: (
      <div className="space-y-4">
        <p>백드롭을 클릭해도 닫히지 않습니다.</p>
        <p className="text-text-info text-sm">ESC 키나 버튼을 사용해서 닫아주세요.</p>
        <Button size="md" onClick={() => {}}>
          닫기
        </Button>
      </div>
    ),
  },
};

// 폼이 포함된 바텀시트
export const WithForm: Story = {
  render: BottomSheetWithState,
  args: {
    title: '폼 입력',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-text-base font-style-medium">이름</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border-base rounded-lg"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-text-base font-style-medium">이메일</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-border-base rounded-lg"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-text-base font-style-medium">메시지</label>
          <textarea
            className="w-full px-3 py-2 border border-border-base rounded-lg h-24"
            placeholder="메시지를 입력하세요"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" size="md" className="flex-1">
            취소
          </Button>
          <Button size="md" className="flex-1">
            확인
          </Button>
        </div>
      </div>
    ),
  },
};

// 스크롤 가능한 긴 콘텐츠
export const LongContent: Story = {
  render: BottomSheetWithState,
  args: {
    title: '긴 콘텐츠',
    children: (
      <div className="space-y-4">
        <p>스크롤 가능한 긴 콘텐츠입니다.</p>
        <div className="space-y-3">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="p-4 bg-bg-base rounded-lg">
              <h4 className="font-style-medium text-text-base">아이템 {i + 1}</h4>
              <p className="text-text-info text-sm mt-1">
                아이템 {i + 1}에 대한 상세 설명입니다. 이 내용은 스크롤을 통해 확인할 수 있습니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};
