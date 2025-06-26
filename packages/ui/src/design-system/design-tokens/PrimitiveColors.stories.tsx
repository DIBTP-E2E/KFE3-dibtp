import type { Meta, StoryObj } from '@storybook/nextjs';

import { colorTokens } from './generated-tokens';
import { StoryPage, PageTitle, ColorPalette } from "../../storybook-components";

const meta: Meta = {
  title: 'Design System/Design Tokens/Colors/Primitive Colors',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 Primitive Color의 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const OrangeColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Orange Colors</PageTitle>

      <ColorPalette type="primitive" title="Orange Colors Palette" colorSet={colorTokens.primary} />
    </StoryPage>
  ),
};

export const BlueColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Blue Colors</PageTitle>

      <ColorPalette type="primitive" title="Blue Colors Palette" colorSet={colorTokens.secondary} />
    </StoryPage>
  ),
};

export const GrayColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Gray Colors</PageTitle>

      <ColorPalette type="primitive" title="Gray Colors Palette" colorSet={colorTokens.neutral} />
    </StoryPage>
  ),
};

export const GreenColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Green Colors</PageTitle>

      <ColorPalette type="primitive" title="Green Colors Palette" colorSet={colorTokens.success} />
    </StoryPage>
  ),
};

export const PinkColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Pink Colors</PageTitle>

      <ColorPalette type="primitive" title="Pink Colors Palette" colorSet={colorTokens.danger} />
    </StoryPage>
  ),
};

export const RedColorsTokens: Story = {
  render: () => (
    <StoryPage>
      <PageTitle>🎨 Design Tokens - Red Colors</PageTitle>

      <ColorPalette type="primitive" title="Red Colors Palette" colorSet={colorTokens.error} />
    </StoryPage>
  ),
};
