import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from '../../atoms/RadioButton';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupDirection } from './RadioGroup.types';

const directions: RadioGroupDirection[] = ['vertical', 'horizontal'];

/* Distinct `name` per story: same-name ownerless radios group document-wide on the docs page. */
const meta = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  args: {
    legend: 'Plan',
    name: 'plan',
    direction: 'vertical',
    disabled: false,
    children: [
      <RadioButton key="hobby" value="hobby">
        Hobby
      </RadioButton>,
      <RadioButton key="pro" value="pro" defaultChecked>
        Pro
      </RadioButton>,
      <RadioButton key="enterprise" value="enterprise">
        Enterprise
      </RadioButton>,
    ],
  },
  argTypes: {
    direction: { control: 'select', options: directions },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    error: { control: 'text' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: {
    name: 'plan-horizontal',
    direction: 'horizontal',
    children: [
      <RadioButton key="hobby" value="hobby">
        Hobby
      </RadioButton>,
      <RadioButton key="pro" value="pro" defaultChecked>
        Pro
      </RadioButton>,
      <RadioButton key="enterprise" value="enterprise">
        Enterprise
      </RadioButton>,
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-8)' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <RadioGroup key={size} legend={`Size ${size}`} name={`sizes-${size}`} size={size}>
          <RadioButton value="a" defaultChecked>
            Option A
          </RadioButton>
          <RadioButton value="b">Option B</RadioButton>
        </RadioGroup>
      ))}
    </div>
  ),
};

export const WithError: Story = {
  args: {
    name: 'plan-error',
    error: 'Choose a plan to continue.',
    children: [
      <RadioButton key="hobby" value="hobby">
        Hobby
      </RadioButton>,
      <RadioButton key="pro" value="pro">
        Pro
      </RadioButton>,
    ],
  },
};

export const Disabled: Story = {
  args: {
    name: 'plan-disabled',
    disabled: true,
  },
};

export const ChildOverrides: Story = {
  render: () => (
    <RadioGroup legend="Notifications" name="notifications" size="sm">
      <RadioButton value="all" defaultChecked>
        All (inherits sm)
      </RadioButton>
      <RadioButton value="mentions" size="lg">
        Mentions (own lg wins)
      </RadioButton>
    </RadioGroup>
  ),
};
