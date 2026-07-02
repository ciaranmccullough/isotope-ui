import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListItem } from '../../atoms/ListItem';
import { List } from './List';
import type { ListDirection, ListElement, ListGap, ListMarker } from './List.types';

const elements: ListElement[] = ['ul', 'ol'];
const directions: ListDirection[] = ['vertical', 'horizontal'];
const gaps: ListGap[] = ['0', '1', '2', '3', '4', '6', '8'];
const markers: ListMarker[] = ['none', 'inherit'];

const meta = {
  title: 'Molecules/List',
  component: List,
  args: {
    as: 'ul',
    direction: 'vertical',
    gap: '2',
    wrap: false,
    marker: 'none',
  },
  argTypes: {
    as: { control: 'select', options: elements },
    direction: { control: 'select', options: directions },
    gap: { control: 'select', options: gaps },
    marker: { control: 'select', options: markers },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>Alpha</ListItem>
      <ListItem>Beta</ListItem>
      <ListItem>Gamma</ListItem>
    </List>
  ),
};

export const Directions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--iso-spacing-6)' }}>
      {directions.map((direction) => (
        <List key={direction} direction={direction}>
          <ListItem>{direction}</ListItem>
          <ListItem>stacks</ListItem>
          <ListItem>items</ListItem>
        </List>
      ))}
    </div>
  ),
};

export const GapScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--iso-spacing-6)' }}>
      {gaps.map((gap) => (
        <List key={gap} direction="horizontal" gap={gap}>
          <ListItem>gap</ListItem>
          <ListItem>{gap}</ListItem>
          <ListItem>items</ListItem>
        </List>
      ))}
    </div>
  ),
};

export const Markers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-8)' }}>
      <List>
        <ListItem>marker=&quot;none&quot;</ListItem>
        <ListItem>(default) for menus,</ListItem>
        <ListItem>tag rows, stacks</ListItem>
      </List>
      <List marker="inherit">
        <ListItem>marker=&quot;inherit&quot;</ListItem>
        <ListItem>restores native bullets</ListItem>
        <ListItem>and the indent</ListItem>
      </List>
      <List as="ol" marker="inherit">
        <ListItem>ordered lists</ListItem>
        <ListItem>restore native</ListItem>
        <ListItem>numbering</ListItem>
      </List>
    </div>
  ),
};

export const OrderedStartReversed: Story = {
  render: () => (
    <List as="ol" marker="inherit" start={3} reversed>
      <ListItem>Countdown from three</ListItem>
      <ListItem>via start=3 + reversed</ListItem>
      <ListItem>(as=&quot;ol&quot; only)</ListItem>
    </List>
  ),
};

export const WrappingTagRow: Story = {
  render: () => (
    <List direction="horizontal" gap="1" wrap style={{ maxWidth: 'var(--iso-size-container-sm)' }}>
      {Array.from({ length: 16 }, (_, index) => (
        <ListItem key={index} style={{ whiteSpace: 'nowrap' }}>
          tag-{index + 1}
        </ListItem>
      ))}
    </List>
  ),
};
