import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { PasswordInput } from '../PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Design System/Base Components/Input/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

// 상태 관리를 위한 래퍼 컴포넌트
const PasswordInputWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <PasswordInput
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        args.onChange?.(e);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <PasswordInputWithState {...args} />,
  args: {
    placeholder: 'Enter your password',
  },
};

export const WithValue: Story = {
  render: (args) => <PasswordInputWithState {...args} />,
  args: {
    placeholder: 'Enter your password',
    value: 'secretpassword123',
  },
};

export const ErrorState: Story = {
  render: (args) => <PasswordInputWithState {...args} />,
  args: {
    placeholder: 'Enter your password',
    error: true,
    value: '123',
  },
};

export const Disabled: Story = {
  render: (args) => <PasswordInputWithState {...args} />,
  args: {
    value: 'disabledpassword',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <PasswordInput placeholder="Enter password" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Value</p>
        <PasswordInput placeholder="Enter password" defaultValue="mypassword123" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Error State</p>
        <PasswordInput placeholder="Enter password" error defaultValue="weak" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Disabled</p>
        <PasswordInput defaultValue="disabledpass" disabled />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isStrong = password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
    const passwordsMatch = password === confirmPassword && password.length > 0;

    return (
      <div className="space-y-4 max-w-md">
        <div>
          <p className="text-sm font-medium mb-2">Password</p>
          <PasswordInput
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password.length > 0 && !isStrong}
          />
          {password.length > 0 && !isStrong && (
            <p className="text-xs text-red-500 mt-1">
              Password must be 8+ characters with uppercase, lowercase, and number
            </p>
          )}
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Confirm Password</p>
          <PasswordInput
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword.length > 0 && !passwordsMatch}
          />
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>

        {isStrong && passwordsMatch && (
          <p className="text-xs text-green-600">✓ Passwords are strong and match!</p>
        )}
      </div>
    );
  },
};
