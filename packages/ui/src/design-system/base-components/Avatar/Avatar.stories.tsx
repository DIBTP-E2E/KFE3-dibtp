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
      options: ['sm', 'md', 'lg', 'xl', 'max'],
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
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImageSrc =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';

// 기본 스토리 (Fallback 아바타)
export const Default: Story = {
  args: {
    alt: '김철수',
    size: 'md',
  },
};

// 실제 이미지가 있는 경우
export const WithImage: Story = {
  args: {
    src: sampleImageSrc,
    alt: '사용자 프로필',
    size: 'lg',
  },
};

// 모든 크기 예시
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar src={sampleImageSrc} alt="Small" size="sm" />
        <p className="mt-2 text-sm text-text-base">sm (24px)</p>
      </div>
      <div className="text-center">
        <Avatar src={sampleImageSrc} alt="Medium" size="md" />
        <p className="mt-2 text-sm text-text-base">md (32px)</p>
      </div>
      <div className="text-center">
        <Avatar src={sampleImageSrc} alt="Large" size="lg" />
        <p className="mt-2 text-sm text-text-base">lg (44px)</p>
      </div>
      <div className="text-center">
        <Avatar src={sampleImageSrc} alt="Extra Large" size="xl" />
        <p className="mt-2 text-sm text-text-base">xl (48px)</p>
      </div>
      <div className="text-center">
        <Avatar src={sampleImageSrc} alt="Max" size="max" />
        <p className="mt-2 text-sm text-text-base">max (128px)</p>
      </div>
    </div>
  ),
  args: {
    alt: '크기 예시',
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

// 에러 상태 테스트
export const ImageError: Story = {
  args: {
    src: 'https://네트워크요청이되지않는이미지경로.jpg',
    alt: '에러 테스트',
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
