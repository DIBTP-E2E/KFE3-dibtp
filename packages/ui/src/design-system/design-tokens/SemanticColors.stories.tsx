import type { Meta, StoryObj } from '@storybook/nextjs';

import { semanticColorCSSValue } from './generated-tokens';
import { StoryPage, PageTitle, HowToUseClass, ColorList } from "../../storybook-components";

const meta: Meta = {
  title: 'Design System/Design Tokens/Colors/Semantic Colors',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 Semantic Color 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;




export const SemanticColorsAllTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Semantic Colors (Utility) </PageTitle>

      <ColorList
        title='Use Text'
        datas={[
        { name: 'Text Base', value: semanticColorCSSValue.text.base },
        { name: 'Text Primary', value: semanticColorCSSValue.text.primary },
        { name: 'Text Secondary', value: semanticColorCSSValue.text.secondary },
        { name: 'Text Disabled', value: semanticColorCSSValue.text.disabled },
        { name: 'Text Info', value: semanticColorCSSValue.text.info },
        { name: 'Text Success', value: semanticColorCSSValue.text.success },
        { name: 'Text Danger', value: semanticColorCSSValue.text.danger },
        { name: 'Text Error', value: semanticColorCSSValue.text.error },
      ]} />

      <ColorList
        title='Use Background'
        datas={[
        { name: 'Background Base', value: semanticColorCSSValue.background.base },
        { name: 'Background Primary', value: semanticColorCSSValue.background.primary },
        { name: 'Background Secondary', value: semanticColorCSSValue.background.secondary },
        { name: 'Background Disabled', value: semanticColorCSSValue.background.disabled },
        { name: 'Background Success', value: semanticColorCSSValue.background.success },
        { name: 'Background Danger', value: semanticColorCSSValue.background.danger },
        { name: 'Background Error', value: semanticColorCSSValue.background.error },
      ]} />

      <ColorList
        title='Use Border'
        datas={[
        { name: 'Border Base', value: semanticColorCSSValue.border.base },
        { name: 'Border Primary', value: semanticColorCSSValue.border.primary },
        { name: 'Border Secondary', value: semanticColorCSSValue.border.secondary },
        { name: 'Border Disabled', value: semanticColorCSSValue.border.disabled },
        { name: 'Border Form', value: semanticColorCSSValue.border.form },
        { name: 'Border Success', value: semanticColorCSSValue.border.success },
        { name: 'Border Danger', value: semanticColorCSSValue.border.danger },
        { name: 'Border Error', value: semanticColorCSSValue.border.error },
      ]} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const SemanticColorsTextTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Semantic Colors (Text Utility) </PageTitle>

      <ColorList
        title='Use Text'
        datas={[
        { name: 'Text Base', value: semanticColorCSSValue.text.base },
        { name: 'Text Primary', value: semanticColorCSSValue.text.primary },
        { name: 'Text Secondary', value: semanticColorCSSValue.text.secondary },
        { name: 'Text Disabled', value: semanticColorCSSValue.text.disabled },
        { name: 'Text Info', value: semanticColorCSSValue.text.info },
        { name: 'Text Success', value: semanticColorCSSValue.text.success },
        { name: 'Text Danger', value: semanticColorCSSValue.text.danger },
        { name: 'Text Error', value: semanticColorCSSValue.text.error },
      ]} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const SemanticColorsBackgroundTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Semantic Colors (Background Utility) </PageTitle>

      <ColorList
        title='Use Background'
        datas={[
        { name: 'Background Base', value: semanticColorCSSValue.background.base },
        { name: 'Background Primary', value: semanticColorCSSValue.background.primary },
        { name: 'Background Secondary', value: semanticColorCSSValue.background.secondary },
        { name: 'Background Disabled', value: semanticColorCSSValue.background.disabled },
        { name: 'Background Success', value: semanticColorCSSValue.background.success },
        { name: 'Background Danger', value: semanticColorCSSValue.background.danger },
        { name: 'Background Error', value: semanticColorCSSValue.background.error },
      ]} />

      <HowToUseClass />
    </StoryPage>
  ),
};

export const SemanticColorsBorderTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Semantic Colors (Border Utility) </PageTitle>

      <ColorList
        title='Use Border'
        datas={[
        { name: 'Border Base', value: semanticColorCSSValue.border.base },
        { name: 'Border Primary', value: semanticColorCSSValue.border.primary },
        { name: 'Border Secondary', value: semanticColorCSSValue.border.secondary },
        { name: 'Border Disabled', value: semanticColorCSSValue.border.disabled },
        { name: 'Border Form', value: semanticColorCSSValue.border.form },
        { name: 'Border Success', value: semanticColorCSSValue.border.success },
        { name: 'Border Danger', value: semanticColorCSSValue.border.danger },
        { name: 'Border Error', value: semanticColorCSSValue.border.error },
      ]} />

      <HowToUseClass />
    </StoryPage>
  ),
};
