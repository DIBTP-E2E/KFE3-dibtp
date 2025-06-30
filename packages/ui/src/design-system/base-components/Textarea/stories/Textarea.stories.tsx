import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Textarea } from '../Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Design System/Base Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

// 상태 관리를 위한 래퍼 컴포넌트
const TextareaWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <Textarea
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
  render: (args) => <TextareaWithState {...args} />,
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithError: Story = {
  render: (args) => <TextareaWithState {...args} />,
  args: {
    placeholder: 'Write your comment...',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  render: (args) => <TextareaWithState {...args} />,
  args: {
    value: 'This field is disabled',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Textarea size="sm" placeholder="Small textarea" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <Textarea size="md" placeholder="Medium textarea" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Textarea size="lg" placeholder="Large textarea" />
      </div>
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">No Resize</p>
        <Textarea resize="none" placeholder="Cannot be resized" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Vertical Resize (Default)</p>
        <Textarea resize="vertical" placeholder="Can be resized vertically" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Horizontal Resize</p>
        <Textarea resize="horizontal" placeholder="Can be resized horizontally" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Both Directions</p>
        <Textarea resize="both" placeholder="Can be resized in both directions" />
      </div>
    </div>
  ),
};

export const RowConfiguration: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">Minimum 2 Rows</p>
        <Textarea minRows={2} placeholder="Minimum 2 rows" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Minimum 3 Rows (Default)</p>
        <Textarea minRows={3} placeholder="Minimum 3 rows" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Minimum 5 Rows</p>
        <Textarea minRows={5} placeholder="Minimum 5 rows" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Maximum 6 Rows</p>
        <Textarea
          minRows={3}
          maxRows={6}
          placeholder="Try typing a lot of text to see the max height limit..."
        />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <Textarea placeholder="Default state" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Error</p>
        <Textarea placeholder="Error state" error="This field is required" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Disabled</p>
        <Textarea value="Disabled field" disabled />
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [feedback, setFeedback] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFeedback(value);
      setHasError(value.length > 500);
    };

    return (
      <div className="max-w-md">
        <div>
          <label className="block text-sm font-medium mb-2">
            Feedback <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Share your thoughts..."
            value={feedback}
            onChange={handleChange}
            error={hasError ? 'Feedback must be 500 characters or less' : undefined}
            minRows={4}
            maxRows={8}
          />
          {!hasError && (
            <p className="mt-1 text-sm text-gray-500">{feedback.length}/500 characters</p>
          )}
        </div>

        {feedback.length > 0 && !hasError && (
          <p className="mt-4 text-sm text-green-600">✓ Thank you for your feedback!</p>
        )}
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">Custom Classes</p>
        <Textarea
          placeholder="Custom styled textarea"
          className="border-2 border-dashed border-blue-300 rounded-xl"
          minRows={4}
        />
      </div>
    </div>
  ),
};
