import type { Meta, StoryObj } from '@storybook/nextjs';

import { colorTokens, utilityColorCSSValue } from './generated-tokens';
import { StoryPage, PageTitle, ColorList, ColorPalette } from '../../storybook-components';

const meta: Meta = {
  title: 'Design System/Design Tokens/Colors/Semantic Colors',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 Semantic Color의 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SemanticColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Semantic Colors </PageTitle>

      <ColorList
        title="Use Primary (for Branding)"
        datas={[
          { name: 'Text Primary', value: utilityColorCSSValue.text.primary },
          { name: 'Background Primary', value: utilityColorCSSValue.background.primary },
          { name: 'Border Primary', value: utilityColorCSSValue.border.primary },
        ]}
      />

      <ColorList
        title="Use Secondary"
        datas={[
          { name: 'Text Secondary', value: utilityColorCSSValue.text.secondary },
          { name: 'Background Secondary', value: utilityColorCSSValue.background.secondary },
          { name: 'Border Secondary', value: utilityColorCSSValue.border.secondary },
        ]}
      />

      <ColorList
        title="Use Base"
        datas={[
          { name: 'Text Base', value: utilityColorCSSValue.text.base },
          { name: 'Border Base', value: utilityColorCSSValue.border.base },
          { name: 'Background Base', value: utilityColorCSSValue.background.base },
        ]}
      />

      <ColorList
        title="Use Form"
        datas={[{ name: 'Border Form', value: utilityColorCSSValue.border.form }]}
      />

      <ColorList
        title="Use Info"
        datas={[{ name: 'Text Info', value: utilityColorCSSValue.text.info }]}
      />

      <ColorList
        title="Use Disabled"
        datas={[
          { name: 'Text Disabled', value: utilityColorCSSValue.text.disabled },
          { name: 'Background Disabled', value: utilityColorCSSValue.background.disabled },
          { name: 'Border Disabled', value: utilityColorCSSValue.border.disabled },
        ]}
      />

      <ColorList
        title="Use Success"
        datas={[
          { name: 'Text Success', value: utilityColorCSSValue.text.success },
          { name: 'Background Success', value: utilityColorCSSValue.background.success },
          { name: 'Border Success', value: utilityColorCSSValue.border.success },
        ]}
      />

      <ColorList
        title="Use Danger"
        datas={[
          { name: 'Text Danger', value: utilityColorCSSValue.text.danger },
          { name: 'Background Danger', value: utilityColorCSSValue.background.danger },
          { name: 'Border Danger', value: utilityColorCSSValue.border.danger },
        ]}
      />

      <ColorList
        title="Use Error"
        datas={[
          { name: 'Text Error', value: utilityColorCSSValue.text.error },
          { name: 'Background Error', value: utilityColorCSSValue.background.error },
          { name: 'Border Error', value: utilityColorCSSValue.border.error },
        ]}
      />
    </StoryPage>
  ),
};

export const PrimaryColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Primary Colors (브랜딩 컬러)</PageTitle>

      <ColorList
        datas={[
          { name: 'Text Primary', value: utilityColorCSSValue.text.primary },
          { name: 'Background Primary', value: utilityColorCSSValue.background.primary },
          { name: 'Border Primary', value: utilityColorCSSValue.border.primary },
        ]}
      />

      <ColorPalette type="semantic" title="Primary Colors Palette" colorSet={colorTokens.primary} />
    </StoryPage>
  ),
};

export const SecondaryColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Secondary Colors (보조 컬러)</PageTitle>

      <ColorList
        datas={[
          { name: 'Text Secondary', value: utilityColorCSSValue.text.secondary },
          { name: 'Background Secondary', value: utilityColorCSSValue.background.secondary },
          { name: 'Border Secondary', value: utilityColorCSSValue.border.secondary },
        ]}
      />

      <ColorPalette
        type="semantic"
        title="Secondary Colors (보조 컬러)"
        colorSet={colorTokens.secondary}
      />
    </StoryPage>
  ),
};

export const NeutralColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Neutral Colors (회색조)</PageTitle>

      <ColorList
        title="Use Base"
        datas={[
          { name: 'Text Base', value: utilityColorCSSValue.text.base },
          { name: 'Border Base', value: utilityColorCSSValue.border.base },
          { name: 'Border Form', value: utilityColorCSSValue.border.form },
          { name: 'Background Base', value: utilityColorCSSValue.background.base },
        ]}
      />

      <ColorList
        title="Use Form"
        datas={[{ name: 'Border Form', value: utilityColorCSSValue.border.form }]}
      />

      <ColorList
        title="Use Info"
        datas={[{ name: 'Text Info', value: utilityColorCSSValue.text.info }]}
      />

      <ColorList
        title="Use Disabled"
        datas={[
          { name: 'Text Disabled', value: utilityColorCSSValue.text.disabled },
          { name: 'Background Disabled', value: utilityColorCSSValue.background.disabled },
          { name: 'Border Disabled', value: utilityColorCSSValue.border.disabled },
        ]}
      />

      <ColorPalette
        type="semantic"
        title="Neutral Colors (회색조)"
        colorSet={colorTokens.neutral}
      />
    </StoryPage>
  ),
};

export const SuccessColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Success Colors (성공 상태)</PageTitle>

      <ColorList
        datas={[
          { name: 'Text Success', value: utilityColorCSSValue.text.success },
          { name: 'Background Success', value: utilityColorCSSValue.background.success },
          { name: 'Border Success', value: utilityColorCSSValue.border.success },
        ]}
      />

      <ColorPalette
        type="semantic"
        title="Success Colors (성공 상태)"
        colorSet={colorTokens.success}
      />
    </StoryPage>
  ),
};

export const DangerColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Danger Colors (위험, 경고 상태)</PageTitle>

      <ColorList
        datas={[
          { name: 'Text Danger', value: utilityColorCSSValue.text.danger },
          { name: 'Background Danger', value: utilityColorCSSValue.background.danger },
          { name: 'Border Danger', value: utilityColorCSSValue.border.danger },
        ]}
      />

      <ColorPalette
        type="semantic"
        title="Danger Colors (위험, 경고 상태)"
        colorSet={colorTokens.danger}
      />
      <ColorPalette type="semantic" title="Error Colors (에러 상태)" colorSet={colorTokens.error} />
    </StoryPage>
  ),
};

export const ErrorColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Error Colors (에러 상태)</PageTitle>

      <ColorList
        datas={[
          { name: 'Text Error', value: utilityColorCSSValue.text.error },
          { name: 'Background Error', value: utilityColorCSSValue.background.error },
          { name: 'Border Error', value: utilityColorCSSValue.border.error },
        ]}
      />

      <ColorPalette type="semantic" title="Error Colors (에러 상태)" colorSet={colorTokens.error} />
    </StoryPage>
  ),
};
