import type { Meta, StoryObj } from '@storybook/nextjs';
import LoginButton from './LoginButton';

const meta = {
  title: 'Web App/Login/LoginButton',
  component: LoginButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
로그인 페이지에서 사용되는 로그인 버튼 컴포넌트입니다.

## 주요 기능
- ✅ 로그인/회원가입 상태 전환
- ✅ 폼 검증 상태에 따른 비활성화
- ✅ 로딩 상태 표시
- ✅ 접근성 지원
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLogin: {
      control: { type: 'boolean' },
      description: '로그인 모드 여부',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 로그인 버튼
export const Login: Story = {
  args: {
    isLogin: true,
    disabled: false,
    loading: false,
  },
};

// 회원가입 버튼
export const SignUp: Story = {
  args: {
    isLogin: false,
    disabled: false,
    loading: false,
  },
};

// 비활성화된 로그인 버튼
export const LoginDisabled: Story = {
  args: {
    isLogin: true,
    disabled: true,
    loading: false,
  },
};

// 로딩 중인 로그인 버튼
export const LoginLoading: Story = {
  args: {
    isLogin: true,
    disabled: false,
    loading: true,
  },
};

// 로딩 중인 회원가입 버튼
export const SignUpLoading: Story = {
  args: {
    isLogin: false,
    disabled: false,
    loading: true,
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">로그인 버튼</h3>
        <div className="flex gap-4">
          <LoginButton isLogin={true} disabled={false} loading={false} />
          <LoginButton isLogin={true} disabled={true} loading={false} />
          <LoginButton isLogin={true} disabled={false} loading={true} />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">회원가입 버튼</h3>
        <div className="flex gap-4">
          <LoginButton isLogin={false} disabled={false} loading={false} />
          <LoginButton isLogin={false} disabled={true} loading={false} />
          <LoginButton isLogin={false} disabled={false} loading={true} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '로그인 버튼의 모든 상태를 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};