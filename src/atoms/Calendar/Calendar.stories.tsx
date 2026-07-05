import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from './Calendar';
import type { CalendarSize, CalendarType } from './Calendar.types';

const sizes: CalendarSize[] = ['sm', 'md', 'lg'];
const types: CalendarType[] = ['date', 'datetime-local'];

const meta = {
  title: 'Atoms/Calendar',
  component: Calendar,
  args: {
    'aria-label': 'Playground date',
    type: 'date',
    size: 'md',
    invalid: false,
    disabled: false,
  },
  argTypes: {
    type: { control: 'select', options: types },
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
          <Calendar type={type} />
        </label>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Calendar key={size} size={size} aria-label={`${size} date`} />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <Calendar
          key={size}
          size={size}
          invalid
          aria-label={`${size} invalid date`}
          defaultValue="2026-07-05"
        />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      <Calendar disabled aria-label="Disabled empty date" />
      <Calendar disabled aria-label="Disabled filled date" defaultValue="2026-07-05" />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    'aria-label': 'Prefilled date',
    defaultValue: '2026-07-05',
  },
};

export const DateTime: Story = {
  args: {
    'aria-label': 'Appointment',
    type: 'datetime-local',
    defaultValue: '2026-07-05T10:30',
  },
};

export const Range: Story = {
  render: () => (
    <Calendar
      aria-label="Booking day (July 2026 only)"
      min="2026-07-01"
      max="2026-07-31"
      defaultValue="2026-07-05"
    />
  ),
};

export const TimeStep: Story = {
  render: () => (
    <Calendar
      type="datetime-local"
      aria-label="Slot in 15-minute steps"
      step={15 * 60}
      defaultValue="2026-07-05T09:00"
    />
  ),
};
