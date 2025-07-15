import type { Meta, StoryObj } from '@storybook/nextjs';
import Button, { type ButtonProps } from './Button';

const meta: Meta<ButtonProps<'button'>> = {
  title: 'Design System/Base Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
공통 버튼 컴포넌트입니다.

## 주요 기능
- ✅ 6가지 미리 정의된 variant (lightMode/darkMode/Primary/Secondary/Danger의 Filled/Outlined 조합)
- ✅ 다양한 크기 지원 (sm, md, lg)
- ✅ 다양한 HTML 요소로 렌더링 가능 (button, a, div, span)
- ✅ 전체 너비 및 비활성화 상태 지원
- ✅ 투명 배경 지원 (isTransparent)

## as prop 사용 가이드
- **button**: 기본값, 일반적인 버튼 용도
- **a**: 링크 기능이 필요한 경우
- **div/span**: react-router-dom의 <Link>와 함께 사용할 때 <a> 태그 중복 방지를 위해 사용
- Next.js의 <Link>는 자식이 <a> 태그일 경우 a 요소 중복이 자동 제거되므로 <a> 태그 사용 권장
- 불필요한 div, span 사용은 지양해주세요

## isTransparent 사용 가이드
- 헤더나 툴바에서 다른 아이콘 버튼들과 균형을 맞춰야 하는 텍스트 버튼에 사용
- 배경색이 투명하여 주변 요소들과 자연스럽게 어우러짐
- 주로 '닫기', '취소', '완료' 등의 액션 버튼에 활용
        `,
      },
    },
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['lightMode', 'darkMode', 'primary', 'secondary', 'danger'],
      description: '버튼의 색상을 선택하세요.',
      table: {
        type: { summary: 'lightMode | darkMode | primary | secondary | danger' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['fulled', 'outlined'],
      description: '버튼의 스타일 변형을 선택하세요.',
      table: {
        type: { summary: 'fulled | outlined' },
        defaultValue: { summary: 'fulled' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼의 크기를 선택하세요.',
      table: {
        type: { summary: 'xs | sm | md | lg | xl' },
        defaultValue: { summary: 'xl' },
      },
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
    isTransparent: {
      control: 'boolean',
      description: '버튼의 배경을 투명하게 설정하세요. 헤더나 툴바의 텍스트 버튼에 유용합니다.',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: '버튼의 모서리 둥글기를 선택하세요.',
      table: {
        type: { summary: 'none | sm | md | lg | xl | full' },
        defaultValue: { summary: 'full' },
      },
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
    color: 'primary',
    variant: 'fulled',
    size: 'xl',
    as: 'button',
    rounded: 'full',
    isDisabled: false,
    isFullWidth: true,
    isTransparent: false,
  },
};

export default meta;

type Story = StoryObj<ButtonProps<'button'>>;

export const PrimaryFilled: Story = {
  args: {
    children: 'Primary Filled',
    color: 'primary',
    variant: 'fulled',
    size: 'xl',
    as: 'button',
  },
};

export const SecondaryFilled: Story = {
  args: {
    children: 'Secondary Filled',
    color: 'secondary',
    variant: 'fulled',
    size: 'xl',
    as: 'button',
  },
};

export const DangerFilled: Story = {
  args: {
    children: 'Danger Filled',
    color: 'danger',
    variant: 'fulled',
    size: 'xl',
    as: 'button',
  },
};

export const PrimaryOutlined: Story = {
  args: {
    children: 'Primary Outlined',
    color: 'primary',
    variant: 'outlined',
    size: 'xl',
    as: 'button',
  },
};

export const SecondaryOutlined: Story = {
  args: {
    children: 'Secondary Outlined',
    color: 'secondary',
    variant: 'outlined',
    size: 'xl',
    as: 'button',
  },
};

export const DangerOutlined: Story = {
  args: {
    children: 'Danger Outlined',
    color: 'danger',
    variant: 'outlined',
    size: 'xl',
    as: 'button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    color: 'primary',
    variant: 'fulled',
    size: 'xl',
    as: 'button',
    isDisabled: true,
  },
};

export const NotFullWidth: Story = {
  args: {
    children: 'Not Full Width',
    color: 'primary',
    variant: 'fulled',
    size: 'xl',
    as: 'button',
    isFullWidth: false,
  },
};

// Anchor 타입을 위한 별도 스토리 타입 정의
type AnchorStory = StoryObj<ButtonProps<'a'>>;

export const AsAnchor: AnchorStory = {
  args: {
    children: 'Anchor Button',
    color: 'primary',
    variant: 'fulled',
    size: 'xl',
    as: 'a',
    href: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'as="a"로 사용하여 링크 기능을 제공하는 버튼입니다. href 속성을 사용할 수 있습니다.',
      },
    },
  },
};

export const TransparentButton: Story = {
  args: {
    children: '닫기',
    color: 'primary',
    size: 'sm',
    isTransparent: true,
    isFullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'isTransparent 속성을 사용한 투명 버튼입니다. 헤더나 툴바에서 다른 아이콘과 균형을 맞추는 텍스트 버튼에 적합합니다.',
      },
    },
  },
};

export const HeaderExample: Story = {
  render: () => (
    <div className="w-full bg-white border border-gray-200 rounded-lg">
      {/* 검색 헤더 예시 */}
      <div className="flex items-center h-14 px-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* 뒤로가기 아이콘 (시뮬레이션) */}
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs">←</span>
          </div>
        </div>

        <div className="flex-1 mx-4">
          <div className="h-8 bg-gray-50 rounded-lg px-3 flex items-center">
            <span className="text-sm text-gray-500">서울 근처에서 검색</span>
          </div>
        </div>

        {/* 투명 텍스트 버튼 */}
        <Button size="sm" isTransparent isFullWidth={false} color="primary">
          닫기
        </Button>
      </div>

      {/* 일반 헤더 예시 */}
      <div className="flex items-center h-14 px-4">
        <div className="flex items-center gap-2">
          {/* 뒤로가기 아이콘 (시뮬레이션) */}
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs">←</span>
          </div>
        </div>

        <h1 className="flex-1 text-center font-medium">페이지 제목</h1>

        {/* 투명 텍스트 버튼 */}
        <Button size="sm" isTransparent isFullWidth={false} color="primary">
          완료
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '실제 헤더에서 isTransparent 버튼이 어떻게 사용되는지 보여주는 예시입니다. 아이콘과 텍스트 버튼이 시각적으로 균형을 이룹니다.',
      },
    },
  },
};

export const TransparentComparison: Story = {
  render: () => (
    <div className="w-full space-y-6">
      {/* 일반 버튼 vs 투명 버튼 비교 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">일반 버튼 vs 투명 버튼</h3>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">일반 버튼:</span>
          <Button size="sm" color="primary" variant="fulled" isFullWidth={false}>
            닫기
          </Button>
          <Button size="sm" color="secondary" variant="outlined" isFullWidth={false}>
            취소
          </Button>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">투명 버튼:</span>
          <Button size="sm" isTransparent isFullWidth={false} color="primary">
            닫기
          </Button>
          <Button size="sm" isTransparent isFullWidth={false} color="secondary">
            취소
          </Button>
        </div>
      </div>

      {/* 다양한 색상의 투명 버튼 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">투명 버튼 색상 옵션</h3>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <Button size="sm" isTransparent isFullWidth={false} color="primary">
            Primary
          </Button>
          <Button size="sm" isTransparent isFullWidth={false} color="secondary">
            Secondary
          </Button>
          <Button size="sm" isTransparent isFullWidth={false} color="danger">
            Danger
          </Button>
          <Button size="sm" isTransparent isFullWidth={false} color="lightMode">
            Light Mode
          </Button>
          <Button size="sm" isTransparent isFullWidth={false} color="darkMode">
            Dark Mode
          </Button>
        </div>
      </div>

      {/* 툴바 시뮬레이션 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">툴바에서의 활용</h3>

        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="xs" isTransparent isFullWidth={false} color="secondary">
              취소
            </Button>
            <Button size="xs" isTransparent isFullWidth={false} color="primary">
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '투명 버튼과 일반 버튼의 차이점과 다양한 활용 사례를 보여줍니다. 툴바나 헤더에서 자연스러운 통합을 제공합니다.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button color="primary" variant="fulled" size="md">
          Primary Filled
        </Button>
        <Button color="secondary" variant="fulled" size="md">
          Secondary Filled
        </Button>
        <Button color="danger" variant="fulled" size="md">
          Danger Filled
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button color="primary" variant="outlined" size="md">
          Primary Outlined
        </Button>
        <Button color="secondary" variant="outlined" size="md">
          Secondary Outlined
        </Button>
        <Button color="danger" variant="outlined" size="md">
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
        <Button color="primary" variant="fulled" size="xs" isFullWidth={false}>
          Extra Small
        </Button>
        <Button color="primary" variant="fulled" size="sm" isFullWidth={false}>
          Small
        </Button>
        <Button color="primary" variant="fulled" size="md" isFullWidth={false}>
          Medium
        </Button>
        <Button color="primary" variant="fulled" size="lg" isFullWidth={false}>
          Large
        </Button>
        <Button color="primary" variant="fulled" size="xl" isFullWidth={false}>
          Extra Large
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 모든 크기를 비교해볼 수 있습니다 (xs < sm < md < lg < xl).',
      },
    },
  },
};

export const RoundedComparison: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button color="primary" variant="fulled" size="md" rounded="none" isFullWidth={false}>
          None
        </Button>
        <Button color="primary" variant="fulled" size="md" rounded="sm" isFullWidth={false}>
          Small
        </Button>
        <Button color="primary" variant="fulled" size="md" rounded="md" isFullWidth={false}>
          Medium
        </Button>
        <Button color="primary" variant="fulled" size="md" rounded="lg" isFullWidth={false}>
          Large
        </Button>
        <Button color="primary" variant="fulled" size="md" rounded="xl" isFullWidth={false}>
          Extra Large
        </Button>
        <Button color="primary" variant="fulled" size="md" rounded="full" isFullWidth={false}>
          Full
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button color="primary" variant="outlined" size="md" rounded="none" isFullWidth={false}>
          None
        </Button>
        <Button color="primary" variant="outlined" size="md" rounded="sm" isFullWidth={false}>
          Small
        </Button>
        <Button color="primary" variant="outlined" size="md" rounded="md" isFullWidth={false}>
          Medium
        </Button>
        <Button color="primary" variant="outlined" size="md" rounded="lg" isFullWidth={false}>
          Large
        </Button>
        <Button color="primary" variant="outlined" size="md" rounded="xl" isFullWidth={false}>
          Extra Large
        </Button>
        <Button color="primary" variant="outlined" size="md" rounded="full" isFullWidth={false}>
          Full
        </Button>
      </div>
      <div className="flex flex-wrap flex-col gap-2 items-start">
        <Button color="primary" variant="fulled" size="sm" rounded="sm" isFullWidth={false}>
          Small Size Small Rounded
        </Button>
        <Button color="primary" variant="fulled" size="md" rounded="md" isFullWidth={false}>
          Medium Size Medium Rounded
        </Button>
        <Button color="primary" variant="fulled" size="lg" rounded="lg" isFullWidth={false}>
          Large Size Large Rounded
        </Button>
        <Button color="primary" variant="fulled" size="xl" rounded="xl" isFullWidth={false}>
          Extra Large Size Extra Large Rounded
        </Button>
        <Button color="primary" variant="fulled" size="xl" rounded="full" isFullWidth={false}>
          Extra Large Size Full Rounded
        </Button>
      </div>
      <div className="flex flex-wrap flex-col gap-2 items-start">
        <Button color="primary" variant="outlined" size="sm" rounded="sm" isFullWidth={false}>
          Small Size Small Rounded
        </Button>
        <Button color="primary" variant="outlined" size="md" rounded="md" isFullWidth={false}>
          Medium Size Medium Rounded
        </Button>
        <Button color="primary" variant="outlined" size="lg" rounded="lg" isFullWidth={false}>
          Large Size Large Rounded
        </Button>
        <Button color="primary" variant="outlined" size="xl" rounded="xl" isFullWidth={false}>
          Extra Large Size Extra Large Rounded
        </Button>
        <Button color="primary" variant="outlined" size="xl" rounded="full" isFullWidth={false}>
          Extra Large Size Full Rounded
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '버튼의 다양한 모서리 둥글기 옵션을 비교해볼 수 있습니다. (none < sm < md < lg < xl < full)',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button color="primary" variant="fulled" size="md">
          Normal
        </Button>
        <Button color="primary" variant="fulled" size="md" isDisabled>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button color="primary" variant="fulled" size="md" isFullWidth>
          Full Width
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button color="primary" variant="fulled" size="md" isFullWidth={false}>
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
