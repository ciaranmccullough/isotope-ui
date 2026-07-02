import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import type { IconSize } from './Icon.types';

const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

/** Fill-based glyph — inherits color via the component's `fill: currentColor`. */
const star = (
  <path d="M12 2l2.917 6.253 6.833.68-5.125 4.58 1.459 6.737L12 16.77 5.916 20.25l1.459-6.737-5.125-4.58 6.833-.68L12 2z" />
);

/** Stroke-based glyph — stroke children must set stroke="currentColor" fill="none" themselves. */
const arrow = (
  <path
    d="M5 12h14M12 5l7 7-7 7"
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  args: {
    size: 'md',
    children: star,
  },
  argTypes: {
    size: { control: 'select', options: sizes },
    children: { control: false },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Icon key={size} size={size}>
          {star}
        </Icon>
      ))}
    </div>
  ),
};

export const DecorativeVsLabelled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-8)', alignItems: 'center' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--iso-spacing-2)' }}>
        <Icon>{star}</Icon>
        Decorative: aria-hidden, the text carries the meaning
      </span>
      <Icon label="Favourite">{star}</Icon>
    </div>
  ),
};

export const ColorInheritance: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)', alignItems: 'center' }}>
      <span style={{ color: 'var(--iso-color-accent-solid-bg)' }}>
        <Icon>{star}</Icon>
      </span>
      <span style={{ color: 'var(--iso-color-positive-solid-bg)' }}>
        <Icon>{star}</Icon>
      </span>
      <span style={{ color: 'var(--iso-color-critical-solid-bg)' }}>
        <Icon>{star}</Icon>
      </span>
      <span style={{ color: 'var(--iso-color-text-muted)' }}>
        <Icon>{arrow}</Icon>
      </span>
    </div>
  ),
};
