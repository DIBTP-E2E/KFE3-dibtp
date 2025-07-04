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
- color, variant, size 옵션 선택 
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
    variant: {
      control: { type: 'select' },
      options: ['fulled', 'inverted'],
      description: '뱃지 variant를 선택하세요.',
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

export const AllColorsFulled: Story = {
  render: () => (
    <div className="flex w-full p-md flex-wrap gap-sm bg-bg-base rounded-md">
      <Badge color="primary" variant="fulled">
        주요
      </Badge>
      <Badge color="secondary" variant="fulled">
        보조
      </Badge>
      <Badge color="danger" variant="fulled">
        위험
      </Badge>
      <Badge color="success" variant="fulled">
        성공
      </Badge>
      <Badge color="disabled" variant="fulled">
        종료
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'fulled 버전의 모든 색상 옵션을 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};

export const AllColorsInverted: Story = {
  render: () => (
    <div className="flex w-full p-md flex-wrap gap-sm bg-bg-base rounded-md">
      <Badge color="primary" variant="inverted">
        주요
      </Badge>
      <Badge color="secondary" variant="inverted">
        보조
      </Badge>
      <Badge color="danger" variant="inverted">
        위험
      </Badge>
      <Badge color="success" variant="inverted">
        성공
      </Badge>
      <Badge color="disabled" variant="inverted">
        종료
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 색상의 inverted 버전을 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};

export const AllSizesFulled: Story = {
  render: () => (
    <section className="grid gap-lg p-md bg-bg-base rounded-md">
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="primary" variant="fulled" size="sm">
          small
        </Badge>
        <Badge color="primary" variant="fulled" size="md">
          medium
        </Badge>
        <Badge color="primary" variant="fulled" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="secondary" variant="fulled" size="sm">
          small
        </Badge>
        <Badge color="secondary" variant="fulled" size="md">
          medium
        </Badge>
        <Badge color="secondary" variant="fulled" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="success" variant="fulled" size="sm">
          small
        </Badge>
        <Badge color="success" variant="fulled" size="md">
          medium
        </Badge>
        <Badge color="success" variant="fulled" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="danger" variant="fulled" size="sm">
          small
        </Badge>
        <Badge color="danger" variant="fulled" size="md">
          medium
        </Badge>
        <Badge color="danger" variant="fulled" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="disabled" variant="fulled" size="sm">
          small
        </Badge>
        <Badge color="disabled" variant="fulled" size="md">
          medium
        </Badge>
        <Badge color="disabled" variant="fulled" size="lg">
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

export const AllSizesInverted: Story = {
  render: () => (
    <section className="grid gap-lg p-md bg-bg-base rounded-md">
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="primary" variant="inverted" size="sm">
          small
        </Badge>
        <Badge color="primary" variant="inverted" size="md">
          medium
        </Badge>
        <Badge color="primary" variant="inverted" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="secondary" variant="inverted" size="sm">
          small
        </Badge>
        <Badge color="secondary" variant="inverted" size="md">
          medium
        </Badge>
        <Badge color="secondary" variant="inverted" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="success" variant="inverted" size="sm">
          small
        </Badge>
        <Badge color="success" variant="inverted" size="md">
          medium
        </Badge>
        <Badge color="success" variant="inverted" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="danger" variant="inverted" size="sm">
          small
        </Badge>
        <Badge color="danger" variant="inverted" size="md">
          medium
        </Badge>
        <Badge color="danger" variant="inverted" size="lg">
          large
        </Badge>
      </div>
      <div className="flex w-full flex-wrap gap-sm items-center">
        <Badge color="disabled" variant="inverted" size="sm">
          small
        </Badge>
        <Badge color="disabled" variant="inverted" size="md">
          medium
        </Badge>
        <Badge color="disabled" variant="inverted" size="lg">
          large
        </Badge>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 사이즈의 inverted 버전을 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};
