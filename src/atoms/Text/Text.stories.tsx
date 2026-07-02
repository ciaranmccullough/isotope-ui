import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';
import type { TextAlign, TextElement, TextSize, TextTone, TextWeight } from './Text.types';

const elements: TextElement[] = [
  'p',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'em',
  'small',
  'label',
];
const sizes: TextSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const weights: TextWeight[] = ['regular', 'medium', 'semibold', 'bold'];
const tones: TextTone[] = ['default', 'secondary', 'muted', 'disabled', 'inverse'];
const aligns: TextAlign[] = ['start', 'center', 'end'];

const meta = {
  title: 'Atoms/Text',
  component: Text,
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    as: 'p',
    size: 'md',
    weight: 'regular',
    tone: 'default',
    truncate: false,
  },
  argTypes: {
    as: { control: 'select', options: elements },
    size: { control: 'select', options: sizes },
    weight: { control: 'select', options: weights },
    tone: { control: 'select', options: tones },
    align: { control: 'select', options: aligns },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Elements: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-2)' }}>
      {elements.map((as) => (
        <Text key={as} as={as}>
          {`<${as}> element at the same visual scale`}
        </Text>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-2)' }}>
      {sizes.map((size) => (
        <Text key={size} size={size}>
          {`size ${size}`}
        </Text>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-2)' }}>
      {weights.map((weight) => (
        <Text key={weight} weight={weight}>
          {`weight ${weight}`}
        </Text>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-2)' }}>
      {tones
        .filter((tone) => tone !== 'inverse')
        .map((tone) => (
          <Text key={tone} tone={tone}>
            {`tone ${tone}`}
          </Text>
        ))}
      <div
        style={{
          background: 'var(--iso-color-neutral-solid-bg)',
          padding: 'var(--iso-spacing-3)',
          borderRadius: 'var(--iso-radius-md)',
        }}
      >
        <Text tone="inverse">tone inverse (on a solid surface)</Text>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--iso-spacing-2)',
        width: 'var(--iso-size-container-sm)',
      }}
    >
      {aligns.map((align) => (
        <Text key={align} align={align}>
          {`align ${align}`}
        </Text>
      ))}
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div style={{ width: 'var(--iso-size-container-sm)' }}>
      <Text truncate>
        This single line of text is far too long for its container, so it is cut off with an
        ellipsis instead of wrapping onto a second line — the consumer constrains the width, the
        atom handles the overflow.
      </Text>
    </div>
  ),
};

export const SemanticsVsScale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-2)' }}>
      <Text as="h2" size="sm" weight="semibold" tone="muted">
        A small, muted h2 — an eyebrow heading
      </Text>
      <Text as="p" size="3xl" weight="bold">
        A paragraph at display scale
      </Text>
      <Text as="span" size="xs" tone="secondary">
        A tiny secondary span
      </Text>
    </div>
  ),
};
