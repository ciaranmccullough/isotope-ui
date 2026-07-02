import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton';
import type { RadioButtonSize } from './RadioButton.types';

const sizes: RadioButtonSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Atoms/RadioButton',
  component: RadioButton,
  args: {
    children: 'Option',
    size: 'md',
    name: 'playground',
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)', alignItems: 'center' }}>
      <RadioButton name="sizes" value="sm" size="sm">
        Small
      </RadioButton>
      <RadioButton name="sizes" value="md" size="md" defaultChecked>
        Medium (default)
      </RadioButton>
      <RadioButton name="sizes" value="lg" size="lg">
        Large
      </RadioButton>
    </div>
  ),
};

export const DefaultChecked: Story = {
  args: {
    name: 'default-checked',
    defaultChecked: true,
    children: 'Selected by default',
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--iso-spacing-2)' }}>
      <RadioButton name="plan" value="hobby">
        Hobby
      </RadioButton>
      <RadioButton name="plan" value="pro" defaultChecked>
        Pro
      </RadioButton>
      <RadioButton name="plan" value="enterprise">
        Enterprise
      </RadioButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--iso-spacing-2)' }}>
      <RadioButton name="disabled-demo" value="off" disabled>
        Disabled
      </RadioButton>
      <RadioButton name="disabled-demo" value="on" disabled defaultChecked>
        Disabled + checked
      </RadioButton>
    </div>
  ),
};
