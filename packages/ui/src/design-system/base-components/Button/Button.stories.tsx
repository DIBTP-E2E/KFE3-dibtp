import type { Meta, StoryObj } from '@storybook/nextjs';
import Button, { type ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'Design System/Base Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
공통 버튼 컴포넌트입니다.

## 주요 기능
- ✅ 6가지 미리 정의된 variant (Primary/Secondary/Danger의 Filled/Outlined 조합)
- ✅ 3가지 크기 지원 (sm, md, lg)
- ✅ 다양한 HTML 요소로 렌더링 가능 (button, a, div, span)
- ✅ 전체 너비 및 비활성화 상태 지원
- ✅ TailwindCSS 동적 클래스 최적화 적용

## as prop 사용 가이드
- **button**: 기본값, 일반적인 버튼 용도
- **a**: 링크 기능이 필요한 경우
- **div/span**: react-router-dom의 <Link>와 함께 사용할 때 <a> 태그 중복 방지를 위해 사용
- Next.js의 <Link>는 자식이 <a> 태그일 경우 a 요소 중복이 자동 제거되므로 <a> 태그 사용 권장
- 불필요한 div, span 사용은 지양해주세요
        `,
      },
    },
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primaryFulled',
        'secondaryFulled',
        'dangerFulled',
        'primaryOutlined',
        'secondaryOutlined',
        'dangerOutlined',
      ],
      description: '버튼의 스타일 변형을 선택하세요.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기를 선택하세요.',
    },
    as: {
      control: { type: 'select' },
      options: ['button', 'a', 'div', 'span'],
      description: '렌더링할 HTML 요소를 선택하세요.',
    },
    isDisabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태를 설정하세요.',
    },
    isFullWidth: {
      control: 'boolean',
      description: '버튼이 전체 너비를 차지할지 설정하세요.',
    },
    href: {
      control: 'text',
      description: 'as="a"일 때 링크 URL을 설정하세요.',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스를 입력하세요.',
    },
    children: {
      control: 'text',
      description: '버튼 내용을 입력하세요.',
    },
  },
  args: {
    children: '버튼',
    variant: 'primaryFulled',
    size: 'md',
    as: 'button',
    isDisabled: false,
    isFullWidth: true,
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const PrimaryFilled: Story = {
  args: {
    children: 'Primary Filled',
    variant: 'primaryFulled',
    size: 'md',
    as: 'button',
  },
};

export const SecondaryFilled: Story = {
  args: {
    children: 'Secondary Filled',
    variant: 'secondaryFulled',
    size: 'md',
    as: 'button',
  },
};

export const DangerFilled: Story = {
  args: {
    children: 'Danger Filled',
    variant: 'dangerFulled',
    size: 'md',
    as: 'button',
  },
};

export const PrimaryOutlined: Story = {
  args: {
    children: 'Primary Outlined',
    variant: 'primaryOutlined',
    size: 'md',
    as: 'button',
  },
};

export const SecondaryOutlined: Story = {
  args: {
    children: 'Secondary Outlined',
    variant: 'secondaryOutlined',
    size: 'md',
    as: 'button',
  },
};

export const DangerOutlined: Story = {
  args: {
    children: 'Danger Outlined',
    variant: 'dangerOutlined',
    size: 'md',
    as: 'button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primaryFulled',
    size: 'md',
    as: 'button',
    isDisabled: true,
  },
};

export const NotFullWidth: Story = {
  args: {
    children: 'Not Full Width',
    variant: 'primaryFulled',
    size: 'md',
    as: 'button',
    isFullWidth: false,
  },
};

export const AsAnchor: Story = {
  args: {
    children: 'Anchor Button',
    variant: 'primaryFulled',
    size: 'md',
    as: 'a',
    href: '#',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="primaryFulled" size="md">
          Primary Filled
        </Button>
        <Button variant="secondaryFulled" size="md">
          Secondary Filled
        </Button>
        <Button variant="dangerFulled" size="md">
          Danger Filled
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="primaryOutlined" size="md">
          Primary Outlined
        </Button>
        <Button variant="secondaryOutlined" size="md">
          Secondary Outlined
        </Button>
        <Button variant="dangerOutlined" size="md">
          Danger Outlined
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 버튼 variants를 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="primaryFulled" size="sm">
          Small
        </Button>
        <Button variant="primaryFulled" size="md">
          Medium
        </Button>
        <Button variant="primaryFulled" size="lg">
          Large
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 모든 크기를 비교해볼 수 있습니다.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="primaryFulled" size="md">
          Normal
        </Button>
        <Button variant="primaryFulled" size="md" isDisabled>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="primaryFulled" size="md" isFullWidth>
          Full Width
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="primaryFulled" size="md" isFullWidth={false}>
          Not Full Width
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 다양한 상태를 확인할 수 있습니다.',
      },
    },
  },
};
