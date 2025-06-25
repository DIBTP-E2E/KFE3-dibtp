import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from './Avatar';

const meta = {
  title: 'Design System/Base Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
사용자 프로필 이미지를 표시하는 Avatar 컴포넌트입니다.

## 주요 기능
- ✅ Next.js Image 컴포넌트 기반 최적화
- ✅ Fallback 아바타 자동 생성
- ✅ 접근성 지원 (alt 속성 필수)
- ✅ 다양한 크기 지원
- ✅ 디자인 시스템 컬러 적용
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '아바타 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    src: {
      control: { type: 'text' },
      description: '이미지 URL',
    },
    alt: {
      control: { type: 'text' },
      description: '대체 텍스트 (필수)',
    },
    name: {
      control: { type: 'text' },
      description: '사용자 이름 (Fallback 생성용)',
    },
    priority: {
      control: { type: 'boolean' },
      description: '이미지 로딩 우선순위',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (Fallback 아바타)
export const Default: Story = {
  args: {
    alt: '김철수',
    name: '김철수',
    size: 'md',
  },
};

// 실제 이미지가 있는 경우
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: '사용자 프로필',
    size: 'lg',
    priority: true,
  },
};

// 모든 크기 예시
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar alt="Small" name="Small" size="sm" />
        <p className="mt-2 text-sm text-text-base">sm (24px)</p>
      </div>
      <div className="text-center">
        <Avatar alt="Medium" name="Medium" size="md" />
        <p className="mt-2 text-sm text-text-base">md (32px)</p>
      </div>
      <div className="text-center">
        <Avatar alt="Large" name="Large" size="lg" />
        <p className="mt-2 text-sm text-text-base">lg (44px)</p>
      </div>
      <div className="text-center">
        <Avatar alt="Extra Large" name="Extra Large" size="xl" />
        <p className="mt-2 text-sm text-text-base">xl (48px)</p>
      </div>
    </div>
  ),
  args: {
    alt: '크기 예시',
    name: '크기 예시',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 Avatar 컴포넌트를 보여줍니다.',
      },
    },
  },
};

// 다양한 사용자 예시
export const MultipleUsers: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar alt="김철수" name="김철수" size="lg" />
      <Avatar alt="이영희" name="이영희" size="lg" />
      <Avatar alt="박민수" name="박민수" size="lg" />
      <Avatar
        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="실제 사용자"
        size="lg"
      />
    </div>
  ),
  args: {
    alt: '여러 사용자',
    name: '여러 사용자',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: '여러 사용자의 Avatar를 함께 표시하는 예시입니다.',
      },
    },
  },
};

// 인터랙션 테스트
export const Interactive: Story = {
  args: {
    alt: '인터랙티브 아바타',
    name: '테스트',
    size: 'lg',
    className: 'cursor-pointer',
    onClick: () => alert('Avatar clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 가능한 Avatar 예시입니다. 호버 시 보더 색상이 변경됩니다.',
      },
    },
  },
};

// 에러 상태 테스트
export const ImageError: Story = {
  args: {
    src: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: '에러 테스트',
    name: '에러테스트',
    size: 'lg',
    onImageError: () => console.log('이미지 로딩 실패'),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지 로딩 실패 시 Fallback 아바타로 자동 전환됩니다.',
      },
    },
  },
};
