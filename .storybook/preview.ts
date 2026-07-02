import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Report violations as failures in the dev-mode a11y panel. Panel-only: nothing runs
      // story tests in CI — enforced a11y coverage is the jest-axe assertion in each
      // component's unit tests (see tests/CLAUDE.md).
      test: 'error',
    },
  },
};

export default preview;
