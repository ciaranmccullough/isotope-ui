import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import type { CheckboxSize } from './Checkbox.types';

const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: {
    children: 'Option',
    size: 'md',
    name: 'playground',
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)', alignItems: 'center' }}>
      <Checkbox name="sizes-sm" size="sm">
        Small
      </Checkbox>
      <Checkbox name="sizes-md" size="md" defaultChecked>
        Medium (default)
      </Checkbox>
      <Checkbox name="sizes-lg" size="lg">
        Large
      </Checkbox>
    </div>
  ),
};

export const DefaultChecked: Story = {
  args: {
    name: 'default-checked',
    defaultChecked: true,
    children: 'Checked by default',
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--iso-spacing-2)' }}>
      <Checkbox name="topping" value="cheese" defaultChecked>
        Extra cheese
      </Checkbox>
      <Checkbox name="topping" value="mushrooms">
        Mushrooms
      </Checkbox>
      <Checkbox name="topping" value="olives" defaultChecked>
        Olives
      </Checkbox>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Checkbox
      name="select-all"
      ref={(node) => {
        // The mixed state is a DOM property, not an attribute — consumers set it via the ref.
        if (node) {
          node.indeterminate = true;
        }
      }}
    >
      Select all (2 of 3 selected)
    </Checkbox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--iso-spacing-2)' }}>
      <Checkbox name="disabled-demo" value="off" disabled>
        Disabled
      </Checkbox>
      <Checkbox name="disabled-demo" value="on" disabled defaultChecked>
        Disabled + checked
      </Checkbox>
    </div>
  ),
};

export const InAForm: Story = {
  name: 'In a form (FormData)',
  render: () => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const toppings = new FormData(event.currentTarget).getAll('topping');
        alert(`FormData topping = ${toppings.join(', ') || '(none)'}`);
      }}
      style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}
    >
      <Checkbox name="topping" value="cheese" defaultChecked>
        Extra cheese
      </Checkbox>
      <Checkbox name="topping" value="olives">
        Olives
      </Checkbox>
      <button type="submit">Read via FormData</button>
    </form>
  ),
};
