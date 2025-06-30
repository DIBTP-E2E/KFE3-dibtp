import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { LabeledTextarea } from '../LabeledTextarea';

const meta: Meta<typeof LabeledTextarea> = {
  title: 'Design System/Base Components/Textarea/LabeledTextarea',
  component: LabeledTextarea,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof LabeledTextarea>;

// 상태 관리를 위한 래퍼 컴포넌트
const LabeledTextareaWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <LabeledTextarea
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
  render: (args) => <LabeledTextareaWithState {...args} />,
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
  },
};

export const Required: Story = {
  render: (args) => <LabeledTextareaWithState {...args} />,
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const WithError: Story = {
  render: (args) => <LabeledTextareaWithState {...args} />,
  args: {
    label: 'Comment',
    placeholder: 'Write your comment...',
    error: 'This field is required',
    required: true,
  },
};

export const WithHelperText: Story = {
  render: (args) => <LabeledTextareaWithState {...args} />,
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters',
  },
};

export const Disabled: Story = {
  render: (args) => <LabeledTextareaWithState {...args} />,
  args: {
    label: 'Disabled Field',
    value: 'This field is disabled',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <LabeledTextarea label="Small" size="sm" placeholder="Small labeled textarea" />
      <LabeledTextarea label="Medium (Default)" size="md" placeholder="Medium labeled textarea" />
      <LabeledTextarea label="Large" size="lg" placeholder="Large labeled textarea" />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <LabeledTextarea label="No Resize" resize="none" placeholder="Cannot be resized" />
      <LabeledTextarea
        label="Vertical Resize"
        resize="vertical"
        placeholder="Can be resized vertically"
      />
      <LabeledTextarea
        label="Horizontal Resize"
        resize="horizontal"
        placeholder="Can be resized horizontally"
      />
      <LabeledTextarea
        label="Both Directions"
        resize="both"
        placeholder="Can be resized in both directions"
      />
    </div>
  ),
};

export const RowConfiguration: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <LabeledTextarea label="Minimum 2 Rows" minRows={2} placeholder="Minimum 2 rows" />
      <LabeledTextarea label="Minimum 5 Rows" minRows={5} placeholder="Minimum 5 rows" />
      <LabeledTextarea
        label="Maximum 6 Rows"
        minRows={3}
        maxRows={6}
        placeholder="Try typing a lot of text to see the max height limit..."
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <LabeledTextarea label="Default" placeholder="Default state" />
      <LabeledTextarea label="Required Field" placeholder="Required field" required />
      <LabeledTextarea
        label="With Error"
        placeholder="Error state"
        error="This field is required"
        required
      />
      <LabeledTextarea
        label="With Helper Text"
        placeholder="With helper text"
        helperText="This is helpful information"
      />
      <LabeledTextarea label="Disabled" value="Disabled field" disabled />
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
        <LabeledTextarea
          label="Feedback"
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={handleChange}
          error={hasError ? 'Feedback must be 500 characters or less' : undefined}
          helperText={!hasError ? `${feedback.length}/500 characters` : undefined}
          required
          minRows={4}
          maxRows={8}
        />

        {feedback.length > 0 && !hasError && (
          <p className="mt-4 text-sm text-green-600">✓ Thank you for your feedback!</p>
        )}
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      notes: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // 간단한 유효성 검사
      if (errors[field] && value.trim()) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

    const handleSubmit = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }

      setErrors(newErrors);
    };

    return (
      <div className="max-w-md space-y-4">
        <LabeledTextarea
          label="Title"
          placeholder="Enter a brief title..."
          value={formData.title}
          onChange={handleChange('title')}
          error={errors.title}
          required
          minRows={1}
          maxRows={2}
        />

        <LabeledTextarea
          label="Description"
          placeholder="Provide a detailed description..."
          value={formData.description}
          onChange={handleChange('description')}
          error={errors.description}
          helperText="Minimum 10 characters required"
          required
          minRows={3}
          maxRows={6}
        />

        <LabeledTextarea
          label="Additional Notes"
          placeholder="Any additional notes... (optional)"
          value={formData.notes}
          onChange={handleChange('notes')}
          helperText="Optional field for extra information"
          minRows={2}
          maxRows={4}
        />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Form
        </button>
      </div>
    );
  },
};
