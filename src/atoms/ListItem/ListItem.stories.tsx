import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListItem } from './ListItem';
import type { ListItemMarker } from './ListItem.types';

const markers: ListItemMarker[] = ['inherit', 'none'];

/**
 * Stories render inside a plain `<ul>`/`<ol>` for valid nesting — the List molecule
 * composes ListItem later and owns all layout/marker decisions.
 */
const meta = {
  title: 'Atoms/ListItem',
  component: ListItem,
  args: {
    children: 'List item',
    marker: 'inherit',
  },
  argTypes: {
    marker: { control: 'select', options: markers },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
};

export const InUnorderedList: Story = {
  render: () => (
    <ul>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </ul>
  ),
};

export const InOrderedList: Story = {
  render: () => (
    <ol>
      <ListItem>Step one</ListItem>
      <ListItem>Step two</ListItem>
      <ListItem>Step three</ListItem>
    </ol>
  ),
};

export const MarkerNone: Story = {
  render: () => (
    <ul style={{ padding: 0 }}>
      <ListItem marker="none">Items that carry their own visuals</ListItem>
      <ListItem marker="none">render without the inherited marker</ListItem>
      <ListItem marker="none">via marker=&quot;none&quot;</ListItem>
    </ul>
  ),
};

export const MarkerComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-8)' }}>
      <ul>
        <ListItem>marker=&quot;inherit&quot;</ListItem>
        <ListItem>keeps the parent</ListItem>
        <ListItem>list&apos;s marker</ListItem>
      </ul>
      <ul>
        <ListItem marker="none">marker=&quot;none&quot;</ListItem>
        <ListItem marker="none">removes the marker</ListItem>
        <ListItem marker="none">entirely</ListItem>
      </ul>
    </div>
  ),
};
