import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
import type { SkeletonShape } from './Skeleton.types';

const shapes: SkeletonShape[] = ['text', 'rect', 'circle'];

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  args: {
    shape: 'text',
    width: '60%',
  },
  argTypes: {
    shape: { control: 'select', options: shapes },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--iso-spacing-4)',
        maxWidth: 'var(--iso-size-container-sm)',
      }}
    >
      <Skeleton shape="text" width="100%" />
      <Skeleton shape="rect" width="100%" height="var(--iso-size-avatar-xl)" />
      <Skeleton shape="circle" width="var(--iso-size-avatar-md)" />
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--iso-spacing-2)',
        maxWidth: 'var(--iso-size-container-sm)',
        fontSize: 'var(--iso-font-size-md)',
      }}
    >
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="80%" />
      <Skeleton width="40%" />
    </div>
  ),
};

export const CircleSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      <Skeleton shape="circle" width="var(--iso-size-avatar-xs)" />
      <Skeleton shape="circle" width="var(--iso-size-avatar-sm)" />
      <Skeleton shape="circle" width="var(--iso-size-avatar-md)" />
      <Skeleton shape="circle" width="var(--iso-size-avatar-lg)" />
      <Skeleton shape="circle" width="var(--iso-size-avatar-xl)" />
    </div>
  ),
};

/**
 * Composed usage: the skeletons themselves are `aria-hidden`; the surrounding region
 * carries `aria-busy="true"` and an accessible name so assistive tech knows the area
 * is loading. Under `prefers-reduced-motion: reduce` the shimmer freezes to a static
 * subtle background.
 */
export const LoadingCard: Story = {
  render: () => (
    <section
      aria-busy="true"
      aria-label="Loading article"
      style={{
        display: 'flex',
        gap: 'var(--iso-spacing-3)',
        alignItems: 'flex-start',
        maxWidth: 'var(--iso-size-container-sm)',
        padding: 'var(--iso-spacing-4)',
        border: 'var(--iso-border-width-1) solid var(--iso-color-border)',
        borderRadius: 'var(--iso-radius-lg)',
      }}
    >
      <Skeleton shape="circle" width="var(--iso-size-avatar-md)" />
      <div style={{ flex: 1, display: 'grid', gap: 'var(--iso-spacing-2)' }}>
        <Skeleton width="40%" />
        <Skeleton shape="rect" width="100%" height="var(--iso-size-avatar-xl)" />
        <Skeleton width="100%" />
        <Skeleton width="80%" />
      </div>
    </section>
  ),
};
