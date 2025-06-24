import type { Preview } from '@storybook/nextjs';
import '../stories/global-styles.css';
import '@repo/ui/styles.css';
import '../../../apps/web/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
