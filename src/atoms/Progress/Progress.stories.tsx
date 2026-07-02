import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';
import type { ProgressSize, ProgressTone } from './Progress.types';

const tones: ProgressTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];
const sizes: ProgressSize[] = ['sm', 'md'];

const column = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--iso-spacing-3)',
  maxWidth: 'var(--iso-size-container-sm)',
} as const;

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  args: {
    'aria-label': 'Progress',
    value: 40,
    max: 100,
    tone: 'accent',
    size: 'md',
  },
  argTypes: {
    tone: { control: 'select', options: tones },
    size: { control: 'select', options: sizes },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={column}>
      {tones.map((tone) => (
        <Progress key={tone} tone={tone} value={60} aria-label={`${tone} progress`} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={column}>
      {sizes.map((size) => (
        <Progress key={size} size={size} value={60} aria-label={`${size} progress`} />
      ))}
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={column}>
      <Progress aria-label="Loading" />
      <Progress size="sm" tone="neutral" aria-label="Loading (small, neutral)" />
    </div>
  ),
};

export const Values: Story = {
  render: () => (
    <div style={column}>
      <Progress value={0} aria-label="Empty" />
      <Progress value={40} aria-label="Partial" />
      <Progress value={100} aria-label="Complete" />
      <Progress value={3} max={8} aria-label="Custom max (3 of 8)" />
    </div>
  ),
};
