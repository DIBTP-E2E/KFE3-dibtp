import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Base Components/Input/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample text',
    placeholder: 'Enter text...',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Enter text...',
    value: 'Invalid input',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    placeholder: 'Enter text...',
    value: 'Valid input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

export const DifferentTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="search" placeholder="Search input" />
    </div>
  ),
};
