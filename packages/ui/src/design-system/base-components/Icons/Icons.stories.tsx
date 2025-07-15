import type { Meta, StoryObj } from '@storybook/nextjs';
import { Icon, type IconName } from './Icon';
import { ICONS } from './assets/Icons';

const ICON_NAMES = Object.keys(ICONS) as IconName[];

const meta: Meta<typeof Icon> = {
  title: 'Design System/Base Components/Icons',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
        아이콘 컴포넌트입니다. react-icons에서 제공하는 아이콘들을 공통 래퍼로 감싸 일관된 스타일로 사용할 수 있도록 구성했습니다.

        📎 https://react-icons.github.io/react-icons/

        [주요 특징]
        - ✅ \`react-icons\` 라이브러리 기반 아이콘 렌더링
        - ✅ 공통 Wrapper를 통해 크기 및 색상 통일
        - ✅ 디자인 시스템과 연계된 size/color prop 지원
        - ✅ 프로젝트 내에서 사용되는 아이콘 목록을 통합 관리

        \`name\` prop을 통해 등록된 아이콘 중 하나를 선택해 렌더링할 수 있습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
      description: '렌더링할 아이콘의 이름',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: '아이콘의 크기 (디자인 토큰 기반)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'inverse', 'info', 'primary', 'secondary', 'success', 'danger', 'error'],
      description: '아이콘의 색상 (디자인 시스템 컬러 토큰 사용)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    className: {
      control: false,
    },
  },
  args: {
    name: ICON_NAMES[0],
    size: 'md',
    color: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Storybook Controls를 통해 아이콘 이름, 크기, 색상 조합을 테스트할 수 있습니다.',
      },
    },
  },
};

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {ICON_NAMES.map((iconName) => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 64,
          }}
        >
          <Icon {...args} name={iconName} />
          <span style={{ fontSize: 12, marginTop: 8 }}>{iconName}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    size: 'md',
    color: 'default',
  },
  parameters: {
    controls: { exclude: ['name'] },
    docs: {
      description: {
        story: '디자인 시스템에 포함된 모든 아이콘들을 미리보기 형태로 확인할 수 있습니다.',
      },
    },
  },
};
