import type { Meta, StoryObj } from '@storybook/react-vite';
import { Counter } from '../../atoms/Counter';
import { Input } from '../../atoms/Input';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  args: {
    label: 'Email',
    required: false,
    children: <Input name="email" type="email" />,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  name: 'With description',
  args: {
    description: 'We only use it to send your receipt.',
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    description: 'We only use it to send your receipt.',
    error: 'Enter a valid email address.',
    children: <Input name="email" type="email" defaultValue="not-an-email" />,
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const NativeSelect: Story = {
  name: 'Native select',
  args: {
    label: 'Country',
    description: 'Where should we ship your order?',
    children: (
      <select name="country" defaultValue="ie">
        <option value="ie">Ireland</option>
        <option value="us">United States</option>
        <option value="jp">Japan</option>
      </select>
    ),
  },
};

export const WithCounter: Story = {
  name: 'With Counter',
  args: {
    label: 'Quantity',
    description: 'Between 1 and 9 per order.',
    children: <Counter name="quantity" defaultValue={1} min={1} max={9} />,
  },
};
