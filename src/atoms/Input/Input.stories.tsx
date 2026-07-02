import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import type { InputSize } from './Input.types';

const sizes: InputSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    'aria-label': 'Playground input',
    placeholder: 'Type something…',
    size: 'md',
    invalid: false,
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: sizes },
    type: {
      control: 'select',
      options: ['text', 'email', 'number', 'password', 'search', 'url', 'tel'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Input key={size} size={size} aria-label={`${size} input`} placeholder={size} />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Input
          key={size}
          size={size}
          invalid
          aria-label={`${size} invalid input`}
          defaultValue="not-an-email"
          type="email"
        />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      <Input disabled aria-label="Disabled empty input" placeholder="Disabled" />
      <Input disabled aria-label="Disabled filled input" defaultValue="Read-only looking" />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    'aria-label': 'Prefilled input',
    defaultValue: 'Uncontrolled initial value',
  },
};

const types = ['text', 'email', 'number', 'password', 'search', 'url', 'tel'] as const;

export const Types: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 'var(--iso-spacing-2) var(--iso-spacing-3)',
        alignItems: 'center',
        maxWidth: 'var(--iso-size-container-sm)',
      }}
    >
      {types.map((type) => (
        <label key={type} style={{ display: 'contents' }}>
          <span style={{ fontFamily: 'var(--iso-font-family-sans)' }}>{type}</span>
          <Input type={type} placeholder={`type="${type}"`} />
        </label>
      ))}
    </div>
  ),
};

export const CharacterWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      <Input htmlSize={6} aria-label="Six characters wide" placeholder="6 ch" />
      <Input htmlSize={20} aria-label="Twenty characters wide" placeholder="20 ch" />
    </div>
  ),
};
