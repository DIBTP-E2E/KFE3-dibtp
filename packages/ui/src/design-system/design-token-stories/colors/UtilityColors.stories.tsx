import type { Meta, StoryObj } from '@storybook/nextjs';

import { utilityColorCSSValue } from './generated-tokens';
import { StoryPage, PageTitle, HowToUseClass, ColorList } from '../../../storybook-components';

const meta: Meta = {
  title: 'Design System/Design Tokens/Colors/Utility Colors',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 Utility Color 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const UtilityColorsAll: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Utility Colors </PageTitle>

      <ColorList
        title="Use Text"
        datas={[
          { name: 'Text Base', value: utilityColorCSSValue.text.base },
          { name: 'Text Primary', value: utilityColorCSSValue.text.primary },
          { name: 'Text Secondary', value: utilityColorCSSValue.text.secondary },
          { name: 'Text Disabled', value: utilityColorCSSValue.text.disabled },
          { name: 'Text Info', value: utilityColorCSSValue.text.info },
          { name: 'Text Success', value: utilityColorCSSValue.text.success },
          { name: 'Text Danger', value: utilityColorCSSValue.text.danger },
          { name: 'Text Error', value: utilityColorCSSValue.text.error },
        ]}
      />

      <ColorList
        title="Use Background"
        datas={[
          { name: 'Background Base', value: utilityColorCSSValue.background.base },
          { name: 'Background Primary', value: utilityColorCSSValue.background.primary },
          { name: 'Background Secondary', value: utilityColorCSSValue.background.secondary },
          { name: 'Background Disabled', value: utilityColorCSSValue.background.disabled },
          { name: 'Background Success', value: utilityColorCSSValue.background.success },
          { name: 'Background Danger', value: utilityColorCSSValue.background.danger },
          { name: 'Background Error', value: utilityColorCSSValue.background.error },
        ]}
      />

      <ColorList
        title="Use Border"
        datas={[
          { name: 'Border Base', value: utilityColorCSSValue.border.base },
          { name: 'Border Primary', value: utilityColorCSSValue.border.primary },
          { name: 'Border Secondary', value: utilityColorCSSValue.border.secondary },
          { name: 'Border Disabled', value: utilityColorCSSValue.border.disabled },
          { name: 'Border Form', value: utilityColorCSSValue.border.form },
          { name: 'Border Success', value: utilityColorCSSValue.border.success },
          { name: 'Border Danger', value: utilityColorCSSValue.border.danger },
          { name: 'Border Error', value: utilityColorCSSValue.border.error },
        ]}
      />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const UtilityColorsText: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Utility Colors</PageTitle>

      <ColorList
        title="Use Text"
        datas={[
          { name: 'Text Base', value: utilityColorCSSValue.text.base },
          { name: 'Text Primary', value: utilityColorCSSValue.text.primary },
          { name: 'Text Secondary', value: utilityColorCSSValue.text.secondary },
          { name: 'Text Disabled', value: utilityColorCSSValue.text.disabled },
          { name: 'Text Info', value: utilityColorCSSValue.text.info },
          { name: 'Text Success', value: utilityColorCSSValue.text.success },
          { name: 'Text Danger', value: utilityColorCSSValue.text.danger },
          { name: 'Text Error', value: utilityColorCSSValue.text.error },
        ]}
      />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const UtilityColorsBackground: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Utility Colors</PageTitle>

      <ColorList
        title="Use Background"
        datas={[
          { name: 'Background Base', value: utilityColorCSSValue.background.base },
          { name: 'Background Primary', value: utilityColorCSSValue.background.primary },
          { name: 'Background Secondary', value: utilityColorCSSValue.background.secondary },
          { name: 'Background Disabled', value: utilityColorCSSValue.background.disabled },
          { name: 'Background Success', value: utilityColorCSSValue.background.success },
          { name: 'Background Danger', value: utilityColorCSSValue.background.danger },
          { name: 'Background Error', value: utilityColorCSSValue.background.error },
        ]}
      />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const UtilityColorsBorder: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Utility Colors</PageTitle>

      <ColorList
        title="Use Border"
        datas={[
          { name: 'Border Base', value: utilityColorCSSValue.border.base },
          { name: 'Border Primary', value: utilityColorCSSValue.border.primary },
          { name: 'Border Secondary', value: utilityColorCSSValue.border.secondary },
          { name: 'Border Disabled', value: utilityColorCSSValue.border.disabled },
          { name: 'Border Form', value: utilityColorCSSValue.border.form },
          { name: 'Border Success', value: utilityColorCSSValue.border.success },
          { name: 'Border Danger', value: utilityColorCSSValue.border.danger },
          { name: 'Border Error', value: utilityColorCSSValue.border.error },
        ]}
      />

      <HowToUseClass />
    </StoryPage>
  ),
};
