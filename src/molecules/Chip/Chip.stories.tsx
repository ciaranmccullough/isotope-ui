import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import type { ChipTone } from './Chip.types';

const tones: ChipTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];

const meta = {
  title: 'Molecules/Chip',
  component: Chip,
  args: {
    children: 'Screening',
    tone: 'neutral',
    dot: false,
  },
  argTypes: {
    tone: { control: 'select', options: tones },
    onRemove: { control: false },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-2)', flexWrap: 'wrap' }}>
      {tones.map((tone) => (
        <Chip key={tone} tone={tone}>
          {tone}
        </Chip>
      ))}
    </div>
  ),
};

export const StatusDots: Story = {
  name: 'With status dot',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-2)', flexWrap: 'wrap' }}>
      <Chip dot tone="neutral">
        Sourced
      </Chip>
      <Chip dot tone="accent">
        Screening
      </Chip>
      <Chip dot tone="caution">
        Interview
      </Chip>
      <Chip dot tone="positive">
        Offer
      </Chip>
      <Chip dot tone="critical">
        Rejected
      </Chip>
    </div>
  ),
};

export const Removable: Story = {
  args: {
    children: 'React',
    tone: 'accent',
    onRemove: () => alert('onRemove — the consumer removes the chip from their own data'),
    removeLabel: 'Remove React',
  },
};

/** The chip is dumb: the consumer owns the filter list and removes entries on `onRemove`. */
const ConsumerFilterBar = () => {
  const [filters, setFilters] = useState(['Skill: React', 'Within 10 mi', 'Available now']);

  return (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-2)', flexWrap: 'wrap' }}>
      {filters.map((filter) => (
        <Chip
          key={filter}
          tone="accent"
          onRemove={() => setFilters((current) => current.filter((f) => f !== filter))}
          removeLabel={`Remove ${filter}`}
        >
          {filter}
        </Chip>
      ))}
      {filters.length === 0 && 'No filters — consumer state drives the list.'}
    </div>
  );
};

export const ConsumerFilters: Story = {
  name: 'Filter bar (consumer state)',
  render: () => <ConsumerFilterBar />,
};
