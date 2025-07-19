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
      /* 스토리북 별칭 이슈 해결을 위한 경로 매칭 */
      '@ui/components': join(__dirname, '../../../packages/ui/src/design-system/base-components'),
      '@ui': join(__dirname, '../../../packages/ui/src'),

      /* TODO: web app 내부에서 @ 별칭을 많이 사용하므로 점진적으로 @web 적용 후 @ 별칭 제거 */
      '@web': join(__dirname, '../../web'),
      '@': join(__dirname, '../../web'),
    };

    return config;
  },
};

export default config;
