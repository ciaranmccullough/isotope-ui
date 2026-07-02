import type { Meta, StoryObj } from '@storybook/react-vite';
import { Counter } from './Counter';

const meta = {
  title: 'Atoms/Counter',
  component: Counter,
  args: {
    'aria-label': 'Quantity',
    defaultValue: 1,
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-3)', justifyItems: 'start' }}>
      <Counter aria-label="Small" defaultValue={1} size="sm" />
      <Counter aria-label="Medium" defaultValue={1} size="md" />
      <Counter aria-label="Large" defaultValue={1} size="lg" />
    </div>
  ),
};

export const MinMaxStep: Story = {
  name: 'Min / max / step',
  args: { defaultValue: 10, min: 0, max: 50, step: 5 },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 3 },
};

export const InAForm: Story = {
  name: 'In a form (FormData)',
  render: () => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const quantity = new FormData(event.currentTarget).get('quantity');
        alert(`FormData quantity = ${String(quantity)}`);
      }}
      style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}
    >
      <Counter aria-label="Quantity" name="quantity" defaultValue={2} min={1} max={9} />
      <button type="submit">Read via FormData</button>
    </form>
  ),
};
