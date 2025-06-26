import type { Meta, StoryObj } from '@storybook/nextjs';

import { colorTokens, semanticColorCSSValue } from './generated-tokens';
import { StoryPage, PageTitle, ColorList, ColorPalette } from "../../storybook-components";

const meta: Meta = {
  title: 'Design System/Design Tokens/Colors/Scale Colors',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 Scale Color의 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;


export const ScaleColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Scale Colors (준 Semantic) </PageTitle>

      <ColorList
        title='Use Primary (for Branding)'
        datas={[
        { name: 'Text Primary', value: semanticColorCSSValue.text.primary },
        { name: 'Background Primary', value: semanticColorCSSValue.background.primary },
        { name: 'Border Primary', value: semanticColorCSSValue.border.primary },
      ]} />

      <ColorList
        title='Use Secondary'
        datas={[
        { name: 'Text Secondary', value: semanticColorCSSValue.text.secondary },
        { name: 'Background Secondary', value: semanticColorCSSValue.background.secondary },
        { name: 'Border Secondary', value: semanticColorCSSValue.border.secondary },
      ]} />

      <ColorList
        title='Use Base'
        datas={[
        { name: 'Text Base', value: semanticColorCSSValue.text.base },
        { name: 'Border Base', value: semanticColorCSSValue.border.base },
        { name: 'Background Base', value: semanticColorCSSValue.background.base },
      ]} />

      <ColorList
        title='Use Form'
        datas={[
        { name: 'Border Form', value: semanticColorCSSValue.border.form },
      ]} />

      <ColorList
        title='Use Info'
        datas={[
        { name: 'Text Info', value: semanticColorCSSValue.text.info },
      ]} />

      <ColorList
        title='Use Disabled'
        datas={[
        { name: 'Text Disabled', value: semanticColorCSSValue.text.disabled },
        { name: 'Background Disabled', value: semanticColorCSSValue.background.disabled },
        { name: 'Border Disabled', value: semanticColorCSSValue.border.disabled },
      ]} />

      <ColorList
        title='Use Success'
        datas={[
        { name: 'Text Success', value: semanticColorCSSValue.text.success },
        { name: 'Background Success', value: semanticColorCSSValue.background.success },
        { name: 'Border Success', value: semanticColorCSSValue.border.success },
      ]} />

      <ColorList
        title='Use Danger'
        datas={[
        { name: 'Text Danger', value: semanticColorCSSValue.text.danger },
        { name: 'Background Danger', value: semanticColorCSSValue.background.danger },
        { name: 'Border Danger', value: semanticColorCSSValue.border.danger },
      ]} />

      <ColorList
        title='Use Error'
        datas={[
        { name: 'Text Error', value: semanticColorCSSValue.text.error },
        { name: 'Background Error', value: semanticColorCSSValue.background.error },
        { name: 'Border Error', value: semanticColorCSSValue.border.error },
      ]} />
    </StoryPage>
  ),
};

export const PrimaryColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Primary Colors (브랜딩 컬러)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Primary', value: semanticColorCSSValue.text.primary },
        { name: 'Background Primary', value: semanticColorCSSValue.background.primary },
        { name: 'Border Primary', value: semanticColorCSSValue.border.primary },
      ]} />

      <ColorPalette title="Primary Colors Palette" colorSet={colorTokens.primary} />
    </StoryPage>
  ),
};

export const SecondaryColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Secondary Colors (보조 컬러)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Secondary', value: semanticColorCSSValue.text.secondary },
        { name: 'Background Secondary', value: semanticColorCSSValue.background.secondary },
        { name: 'Border Secondary', value: semanticColorCSSValue.border.secondary },
      ]} />

      <ColorPalette title="Secondary Colors (보조 컬러)" colorSet={colorTokens.secondary} />
    </StoryPage>
  ),
};

export const NeutralColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Neutral Colors (회색조)</PageTitle>

      <ColorList
        title='Use Base'
        datas={[
        { name: 'Text Base', value: semanticColorCSSValue.text.base },
        { name: 'Border Base', value: semanticColorCSSValue.border.base },
        { name: 'Border Form', value: semanticColorCSSValue.border.form },
        { name: 'Background Base', value: semanticColorCSSValue.background.base },
      ]} />

      <ColorList
        title='Use Form'
        datas={[
        { name: 'Border Form', value: semanticColorCSSValue.border.form },
      ]} />

      <ColorList
        title='Use Info'
        datas={[
        { name: 'Text Info', value: semanticColorCSSValue.text.info },
      ]} />

      <ColorList
        title='Use Disabled'
        datas={[
        { name: 'Text Disabled', value: semanticColorCSSValue.text.disabled },
        { name: 'Background Disabled', value: semanticColorCSSValue.background.disabled },
        { name: 'Border Disabled', value: semanticColorCSSValue.border.disabled },
      ]} />

      <ColorPalette title="Neutral Colors (회색조)" colorSet={colorTokens.neutral} />
    </StoryPage>
  ),
};

export const SuccessColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Success Colors (성공 상태)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Success', value: semanticColorCSSValue.text.success },
        { name: 'Background Success', value: semanticColorCSSValue.background.success },
        { name: 'Border Success', value: semanticColorCSSValue.border.success },
      ]} />

      <ColorPalette title="Success Colors (성공 상태)" colorSet={colorTokens.success} />
    </StoryPage>
  ),
};

export const DangerColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Danger Colors (위험, 경고 상태)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Danger', value: semanticColorCSSValue.text.danger },
        { name: 'Background Danger', value: semanticColorCSSValue.background.danger },
        { name: 'Border Danger', value: semanticColorCSSValue.border.danger },
      ]} />

      <ColorPalette title="Danger Colors (위험, 경고 상태)" colorSet={colorTokens.danger} />
      <ColorPalette title="Error Colors (에러 상태)" colorSet={colorTokens.error} />
    </StoryPage>
  ),
};

export const ErrorColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Error Colors (에러 상태)</PageTitle>

      <ColorList
        datas={[
        { name: 'Text Error', value: semanticColorCSSValue.text.error },
        { name: 'Background Error', value: semanticColorCSSValue.background.error },
        { name: 'Border Error', value: semanticColorCSSValue.border.error },
      ]} />

      <ColorPalette title="Error Colors (에러 상태)" colorSet={colorTokens.error} />
    </StoryPage>
  ),
};
