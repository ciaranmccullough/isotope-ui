import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import type { TagTone } from './Tag.types';

const tones: TagTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  args: {
    children: 'Design systems',
    tone: 'neutral',
  },
  argTypes: {
    tone: { control: 'select', options: tones },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-2)', flexWrap: 'wrap' }}>
      <Tag tone="neutral">Neutral</Tag>
      <Tag tone="accent">Accent</Tag>
      <Tag tone="positive">Positive</Tag>
      <Tag tone="critical">Critical</Tag>
      <Tag tone="caution">Caution</Tag>
    </div>
  ),
};

export const SkillList: Story = {
  name: 'In context (skill list)',
  render: () => (
    <p
      style={{
        display: 'flex',
        gap: 'var(--iso-spacing-2)',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontFamily: 'var(--iso-font-family-sans)',
      }}
    >
      Maya Khan —<Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Accessibility</Tag>
      <Tag tone="positive">Available</Tag>
    </p>
  ),
};
