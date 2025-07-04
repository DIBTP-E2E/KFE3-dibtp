import type { StoryObj, Meta } from '@storybook/nextjs';
import Badge from './Badge';

const meta = {
  component: Badge,
  title: 'Design System/Base Components/Badge',
  parameters: {
    docs: {
      description: {
        component: `
뱃지 컴포넌트 입니다.

## 주요 기능
- color, size 옵션 선택 
- 커스텀 텍스트 입력 자유도 증가
- 아이콘 + 텍스트 등 다양한 컨텐츠 조합 지원
        `,
      },
    },
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success', 'disabled'],
      description: '뱃지 색상을 선택하세요.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '뱃지 사이즈를 선택하세요.',
    },
    children: {
      control: { type: 'text' },
      description: '뱃지에 표시될 텍스트를 입력하세요.',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllColors: Story = {
  render: () => (
    <div className="flex w-full flex-wrap gap-sm">
      <Badge color="primary">주요</Badge>
      <Badge color="secondary">보조</Badge>
      <Badge color="danger">위험</Badge>
      <Badge color="success">성공</Badge>
      <Badge color="disabled">종료</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 색상 옵션을 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <section className="grid gap-lg">
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="primary" size="sm">
          small
        </Badge>
        <Badge color="primary" size="md">
          medium
        </Badge>
        <Badge color="primary" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="secondary" size="sm">
          small
        </Badge>
        <Badge color="secondary" size="md">
          medium
        </Badge>
        <Badge color="secondary" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="success" size="sm">
          small
        </Badge>
        <Badge color="success" size="md">
          medium
        </Badge>
        <Badge color="success" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="danger" size="sm">
          small
        </Badge>
        <Badge color="danger" size="md">
          medium
        </Badge>
        <Badge color="danger" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="disabled" size="sm">
          small
        </Badge>
        <Badge color="disabled" size="md">
          medium
        </Badge>
        <Badge color="disabled" size="lg">
          large
        </Badge>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 사이즈 옵션을 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};
