import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import type { SwitchSize } from './Switch.types';

const sizes: SwitchSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  args: {
    children: 'Enable notifications',
    size: 'md',
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)', alignItems: 'center' }}>
      <Switch size="sm">Small</Switch>
      <Switch size="md">Medium</Switch>
      <Switch size="lg">Large</Switch>
    </div>
  ),
};

export const DefaultChecked: Story = {
  args: { defaultChecked: true, children: 'Starts on' },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)' }}>
      <Switch disabled>Off and disabled</Switch>
      <Switch disabled defaultChecked>
        On and disabled
      </Switch>
    </div>
  ),
};

/** Without visible label text, `aria-label` is REQUIRED for the accessible name. */
export const WithoutVisibleLabel: Story = {
  render: () => <Switch aria-label="Enable notifications" />,
};
