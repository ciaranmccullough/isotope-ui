import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import type { AvatarSize } from './Avatar.types';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * Self-contained sample portrait (SVG data URI) so stories render offline. This is image
 * content — a stand-in photo asset — not component styling; the atom itself sets no colors.
 */
const sampleSrc = `data:image/svg+xml,${encodeURIComponent(
  [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">',
    '<rect width="96" height="96" fill="lightsteelblue"/>',
    '<circle cx="48" cy="38" r="16" fill="white"/>',
    '<path d="M16 92a32 26 0 0 1 64 0z" fill="white"/>',
    '</svg>',
  ].join(''),
)}`;

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  args: {
    src: sampleSrc,
    alt: 'Ada Lovelace',
    name: 'Ada Lovelace',
    size: 'md',
  },
  argTypes: {
    size: { control: 'select', options: sizes },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ImageSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Avatar key={size} src={sampleSrc} alt={`Ada Lovelace (${size})`} size={size} />
      ))}
    </div>
  ),
};

export const InitialsFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Avatar key={size} name="Ada Lovelace" size={size} />
      ))}
    </div>
  ),
};

export const InitialsEdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {/* single word -> one letter */}
      <Avatar name="Cher" />
      {/* first + last word only */}
      <Avatar name="Grace Brewster Hopper" />
      {/* lowercase input is uppercased */}
      <Avatar name="ada lovelace" />
    </div>
  ),
};
