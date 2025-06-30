import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { LabeledInput } from '../LabeledInput';

const meta: Meta<typeof LabeledInput> = {
  title: 'Design System/Base Components/Input/LabeledInput',
  component: LabeledInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof LabeledInput>;

// 상태 관리를 위한 래퍼 컴포넌트
const LabeledInputWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <LabeledInput
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
  render: (args) => <LabeledInputWithState {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Required: Story = {
  render: (args) => <LabeledInputWithState {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const WithError: Story = {
  render: (args) => <LabeledInputWithState {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    error: 'Password must be at least 8 characters',
    required: true,
  },
};

export const WithHelperText: Story = {
  render: (args) => <LabeledInputWithState {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Must be 3-20 characters long',
  },
};

export const Disabled: Story = {
  render: (args) => <LabeledInputWithState {...args} />,
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit this field',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <LabeledInput label="Default" placeholder="Enter text" />
      <LabeledInput label="Required Field" placeholder="Enter text" required />
      <LabeledInput
        label="With Error"
        placeholder="Enter text"
        error="This field is required"
        required
      />
      <LabeledInput
        label="With Helper Text"
        placeholder="Enter text"
        helperText="This is helpful information"
      />
      <LabeledInput label="Disabled" value="Disabled value" disabled />
    </div>
  ),
};

export const DifferentInputTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <LabeledInput label="Email" type="email" placeholder="email@example.com" />
      <LabeledInput label="Password" type="password" placeholder="Enter password" />
      <LabeledInput label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
      <LabeledInput label="Search" type="search" placeholder="Search..." />
    </div>
  ),
};
