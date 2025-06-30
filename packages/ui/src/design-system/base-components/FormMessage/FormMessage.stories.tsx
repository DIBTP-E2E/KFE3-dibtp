import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormMessage } from './FormMessage';
import { useState } from 'react';

const meta: Meta<typeof FormMessage> = {
  title: 'Design System/Base Components/FormMessage',
  component: FormMessage,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'success', 'helper'],
    },
    children: { control: 'text' },
    id: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof FormMessage>;

export const Error: Story = {
  args: {
    type: 'error',
    children: 'This field is required',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    children: 'Your input is valid',
  },
};

export const Helper: Story = {
  args: {
    type: 'helper',
    children: 'Enter at least 8 characters',
  },
};

export const LongMessages: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="font-medium mb-2">Error Message</p>
        <FormMessage type="error">
          This password is too weak. Please include at least 8 characters with a mix of uppercase
          letters, lowercase letters, numbers, and special characters.
        </FormMessage>
      </div>

      <div>
        <p className="font-medium mb-2">Success Message</p>
        <FormMessage type="success">
          Great! Your password meets all security requirements and has been successfully updated.
        </FormMessage>
      </div>

      <div>
        <p className="font-medium mb-2">Helper Message</p>
        <FormMessage type="helper">
          Your password should be at least 8 characters long and include a combination of letters,
          numbers, and special characters for optimal security.
        </FormMessage>
      </div>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="font-medium mb-3">Message Types</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Error</p>
            <FormMessage type="error">Invalid email format</FormMessage>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Success</p>
            <FormMessage type="success">Email verified successfully</FormMessage>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Helper</p>
            <FormMessage type="helper">We'll send a verification link to this email</FormMessage>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithFormFields: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <label htmlFor="email-error" className="block font-medium mb-2">
          Email Address *
        </label>
        <input
          id="email-error"
          type="email"
          className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="user@example.com"
          aria-describedby="email-error-msg"
        />
        <FormMessage id="email-error-msg" type="error">
          Please enter a valid email address
        </FormMessage>
      </div>

      <div>
        <label htmlFor="password-success" className="block font-medium mb-2">
          Password *
        </label>
        <input
          id="password-success"
          type="password"
          className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Enter password"
          aria-describedby="password-success-msg"
        />
        <FormMessage id="password-success-msg" type="success">
          Strong password!
        </FormMessage>
      </div>

      <div>
        <label htmlFor="bio-helper" className="block font-medium mb-2">
          Bio
        </label>
        <textarea
          id="bio-helper"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell us about yourself..."
          rows={3}
          aria-describedby="bio-helper-msg"
        />
        <FormMessage id="bio-helper-msg" type="helper">
          Optional field. Maximum 500 characters.
        </FormMessage>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<{
      type: 'error' | 'success' | 'helper';
      text: string;
    } | null>(null);

    const validateEmail = (value: string) => {
      if (!value) {
        setMessage({ type: 'helper', text: 'Please enter your email address' });
        return;
      }

      if (value.length < 3) {
        setMessage({ type: 'error', text: 'Email is too short' });
        return;
      }

      if (!value.includes('@')) {
        setMessage({ type: 'error', text: 'Please include @ in your email' });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setMessage({ type: 'error', text: 'Please enter a valid email format' });
        return;
      }

      setMessage({ type: 'success', text: 'Email format is valid' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      validateEmail(value);
    };

    return (
      <div className="max-w-md">
        <label htmlFor="interactive-email" className="block font-medium mb-2">
          Email Address *
        </label>
        <input
          id="interactive-email"
          type="email"
          value={email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
            message?.type === 'error'
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : message?.type === 'success'
                ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="user@example.com"
          aria-describedby="interactive-email-msg"
        />
        {message && (
          <FormMessage id="interactive-email-msg" type={message.type}>
            {message.text}
          </FormMessage>
        )}
      </div>
    );
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Accessibility Features</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Error messages use role="alert" for immediate announcement</li>
          <li>• Messages can be linked via aria-describedby</li>
          <li>• Visual icons supplement text for clarity</li>
          <li>• Color and text convey meaning, not just color alone</li>
        </ul>
      </div>

      <div>
        <label htmlFor="accessible-field" className="block font-medium mb-2">
          Test Field *
        </label>
        <input
          id="accessible-field"
          type="text"
          className="w-full px-3 py-2 border border-red-300 rounded-md"
          placeholder="Leave empty to see error"
          aria-describedby="accessible-field-error"
          aria-invalid="true"
        />
        <FormMessage id="accessible-field-error" type="error">
          This field is required and cannot be empty
        </FormMessage>
        <p className="mt-2 text-sm text-gray-600">
          Screen readers will announce the error message immediately due to role="alert"
        </p>
      </div>
    </div>
  ),
};
