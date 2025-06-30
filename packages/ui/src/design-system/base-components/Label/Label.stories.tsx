import type { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Design System/Base Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: 'default-input',
    children: 'Default Label',
  },
  render: (args) => (
    <div>
      <Label {...args} />
      <input
        id="default-input"
        type="text"
        placeholder="Associated input field"
        className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full max-w-xs"
      />
    </div>
  ),
};

export const Required: Story = {
  args: {
    htmlFor: 'required-input',
    children: 'Required Field',
    required: true,
  },
  render: (args) => (
    <div>
      <Label {...args} />
      <input
        id="required-input"
        type="text"
        placeholder="This field is required"
        className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full max-w-xs"
        required
      />
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    htmlFor: 'custom-input',
    children: 'Custom Styled Label',
    className: 'text-blue-600 font-bold text-lg',
  },
  render: (args) => (
    <div>
      <Label {...args} />
      <input
        id="custom-input"
        type="text"
        placeholder="Input with custom label styling"
        className="mt-2 px-3 py-2 border border-blue-300 rounded-md w-full max-w-xs"
      />
    </div>
  ),
};

export const LongText: Story = {
  args: {
    htmlFor: 'long-text-input',
    children:
      'This is a very long label text that demonstrates how the label component handles longer content and wrapping behavior',
    required: true,
  },
  render: (args) => (
    <div className="max-w-md">
      <Label {...args} />
      <textarea
        id="long-text-input"
        placeholder="Textarea with long label"
        className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
        rows={3}
      />
    </div>
  ),
};

export const MultipleLabels: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <Label htmlFor="email" required>
          Email Address
        </Label>
        <input
          id="email"
          type="email"
          placeholder="user@example.com"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <Label htmlFor="password" required>
          Password
        </Label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio (Optional)</Label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself..."
          className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="newsletter">Subscribe to Newsletter</Label>
        <input id="newsletter" type="checkbox" className="mt-2" />
      </div>
    </div>
  ),
};

export const WithDifferentInputTypes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <Label htmlFor="text-input" required>
          Text Input
        </Label>
        <input
          id="text-input"
          type="text"
          placeholder="Enter text"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <Label htmlFor="select-input" required>
          Select Dropdown
        </Label>
        <select
          id="select-input"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Choose an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      <div>
        <Label htmlFor="textarea-input">Textarea</Label>
        <textarea
          id="textarea-input"
          placeholder="Enter multiple lines of text"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="file-input">File Upload</Label>
        <input id="file-input" type="file" className="mt-2 w-full" />
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Accessibility Features</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Uses semantic &lt;label&gt; element</li>
          <li>• Connected to input via htmlFor attribute</li>
          <li>• Required indicator for screen readers</li>
          <li>• Proper focus management</li>
        </ul>
      </div>

      <div>
        <Label htmlFor="accessible-input" required>
          Accessible Form Field
        </Label>
        <input
          id="accessible-input"
          type="text"
          placeholder="Try clicking the label above"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-describedby="accessible-help"
        />
        <p id="accessible-help" className="mt-1 text-sm text-gray-600">
          Clicking the label will focus this input field
        </p>
      </div>
    </div>
  ),
};
