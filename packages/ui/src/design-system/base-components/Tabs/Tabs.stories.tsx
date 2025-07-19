import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Tabs from './Tabs';
import type { TabsProps } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Base Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 페이지에서 사용할 수 있는 공통 탭 네비게이션 컴포넌트입니다. 접근성과 키보드 네비게이션을 완벽 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: '탭 옵션 배열',
      table: {
        type: { summary: 'TabOption[]' },
      },
    },
    activeTab: {
      description: '현재 활성화된 탭의 키',
      table: {
        type: { summary: 'string' },
      },
    },
    onTabChange: {
      description: '탭 변경 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(key: string) => void' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '탭의 크기',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'lightMode', 'darkMode'],
      description: '탭의 색상',
      table: {
        type: { summary: 'primary | secondary | lightMode | darkMode' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'select',
      options: ['fulled', 'outlined'],
      description: '탭의 스타일 변형',
      table: {
        type: { summary: 'fulled | outlined' },
        defaultValue: { summary: 'fulled' },
      },
    },
    className: {
      description: '추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      description: '접근성을 위한 레이블',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Tab navigation' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 상태를 가진 컴포넌트 래퍼
const TabsWithState = (args: TabsProps) => {
  const [activeTab, setActiveTab] = useState(args.activeTab);

  return (
    <div className="w-full min-w-[500px]">
      <Tabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

// 기본 스토리
export const Default: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'primary',
    variant: 'fulled',
  },
};

// 3개 탭 예제
export const ThreeTabs: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'all', label: '전체' },
      { key: 'active', label: '진행중' },
      { key: 'completed', label: '완료' },
    ],
    activeTab: 'all',
    size: 'md',
    color: 'primary',
    variant: 'fulled',
  },
};

// 크기 변형 - 작은 크기
export const SmallSize: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'sm',
    color: 'primary',
    variant: 'fulled',
  },
};

// 크기 변형 - 큰 크기
export const LargeSize: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'lg',
    color: 'primary',
    variant: 'fulled',
  },
};

// 색상 변형 - 보조 색상
export const SecondaryColor: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'secondary',
    variant: 'fulled',
  },
};

// 색상 변형 - 라이트 모드
export const LightModeColor: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'lightMode',
    variant: 'fulled',
  },
};

// 색상 변형 - 다크 모드
export const DarkModeColor: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'darkMode',
    variant: 'fulled',
  },
};

// 스타일 변형 - 아웃라인
export const OutlinedVariant: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'primary',
    variant: 'outlined',
  },
};

// 스타일 변형 - 아웃라인 + 보조 색상
export const OutlinedSecondary: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'secondary',
    variant: 'outlined',
  },
};

// 전체 너비 사용
export const FullWidth: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'primary',
    variant: 'fulled',
  },
};

// 비활성화된 탭 포함
export const WithDisabledTab: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2 (비활성)', disabled: true },
      { key: 'tab3', label: '탭 3' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'primary',
    variant: 'fulled',
  },
};

// 긴 텍스트 처리
export const LongText: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '매우 긴 탭 제목입니다 매우 긴 탭 제목입니다' },
      { key: 'tab2', label: '짧은 탭' },
      { key: 'tab3', label: '또 다른 긴 탭 제목 또 다른 긴 탭 제목' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'primary',
    variant: 'fulled',
  },
};

// 접근성 테스트 - 키보드 네비게이션
export const AccessibilityTest: Story = {
  render: TabsWithState,
  args: {
    options: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2 (비활성)', disabled: true },
      { key: 'tab3', label: '탭 3' },
      { key: 'tab4', label: '탭 4' },
    ],
    activeTab: 'tab1',
    size: 'md',
    color: 'primary',
    variant: 'fulled',
    'aria-label': '접근성 테스트 탭 네비게이션',
  },
  parameters: {
    docs: {
      description: {
        story:
          '키보드 네비게이션 테스트용 스토리입니다. 좌우 화살표 키, Home, End 키를 사용하여 탭 간 이동이 가능합니다.',
      },
    },
  },
};
