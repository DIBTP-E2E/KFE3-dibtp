import { join, dirname } from 'path';

import type { StorybookConfig } from '@storybook/nextjs';

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/ui/src/**/*.mdx',
    '../../../apps/web/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../apps/web/app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // TypeScript path aliases 설정
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      /* 스토리북 별칭 이슈를 위한 임시 경로 매칭 : vite로 마이그레이션 하면서 수정 예정 */
      '@/utils/cn': join(__dirname, '../../../packages/ui/src/utils/cn'),
      '@/storybook-components': join(__dirname, '../../../packages/ui/src/storybook-components'),
      '@/design-system': join(__dirname, '../../../packages/ui/src/design-system'),
      '@': join(__dirname, '../../web'),
    };

    return config;
  },
};

export default config;
