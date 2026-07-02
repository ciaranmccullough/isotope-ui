import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import type { SelectSize } from './Select.types';

const sizes: SelectSize[] = ['sm', 'md', 'lg'];

const fruitOptions = (
  <>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry">Cherry</option>
    <option value="dragonfruit">Dragonfruit</option>
  </>
);

const meta = {
  title: 'Molecules/Select',
  component: Select,
  args: {
    'aria-label': 'Playground select',
    size: 'md',
    invalid: false,
    disabled: false,
    children: fruitOptions,
  },
  argTypes: {
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Select key={size} size={size} aria-label={`${size} select`}>
          {fruitOptions}
        </Select>
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Select key={size} size={size} invalid aria-label={`${size} invalid select`}>
          <option value="">Choose a fruit…</option>
          {fruitOptions}
        </Select>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      <Select disabled aria-label="Disabled select">
        {fruitOptions}
      </Select>
      <Select disabled aria-label="Disabled preselected select" defaultValue="cherry">
        {fruitOptions}
      </Select>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    'aria-label': 'Prefilled select',
    defaultValue: 'banana',
  },
};

export const Grouped: Story = {
  render: () => (
    <Select aria-label="Grouped select">
      <optgroup label="Citrus">
        <option value="lemon">Lemon</option>
        <option value="lime">Lime</option>
        <option value="orange">Orange</option>
      </optgroup>
      <optgroup label="Stone fruit">
        <option value="peach">Peach</option>
        <option value="plum">Plum</option>
      </optgroup>
    </Select>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Select aria-label="Multiple select" multiple defaultValue={['apple', 'cherry']}>
      {fruitOptions}
    </Select>
  ),
};

export const OptionCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'flex-start' }}>
      <Select htmlSize={4} aria-label="Four visible options">
        {fruitOptions}
      </Select>
      <Select htmlSize={2} aria-label="Two visible options">
        {fruitOptions}
      </Select>
    </div>
  ),
};
