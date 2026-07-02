import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';
import { Link } from '../../atoms/Link';
import { Button } from '../../atoms/Button';
import { ListItem } from '../../atoms/ListItem';
import { Text } from '../../atoms/Text';
import { List } from '../../molecules/List';

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = (
  <List direction="horizontal" gap="4">
    <ListItem>
      <Link href="#docs">Docs</Link>
    </ListItem>
    <ListItem>
      <Link href="#components">Components</Link>
    </ListItem>
    <ListItem>
      <Link href="#tokens">Tokens</Link>
    </ListItem>
  </List>
);

export const Full: Story = {
  render: () => (
    <Navbar
      brand={
        <Text as="span" weight="semibold">
          ⚛ isotope-ui
        </Text>
      }
      actions={
        <>
          <Button emphasis="ghost" size="sm">
            Sign in
          </Button>
          <Button tone="accent" size="sm">
            Get started
          </Button>
        </>
      }
    >
      {items}
    </Navbar>
  ),
};

export const BrandOnly: Story = {
  render: () => (
    <Navbar
      brand={
        <Text as="span" weight="semibold">
          ⚛ isotope-ui
        </Text>
      }
    />
  ),
};

export const Sticky: Story = {
  render: () => (
    <div style={{ height: 'var(--iso-size-container-sm)', overflow: 'auto' }}>
      <Navbar sticky brand={<Text as="span">⚛ sticky</Text>}>
        {items}
      </Navbar>
      <div style={{ height: 'var(--iso-size-container-lg)', padding: 'var(--iso-spacing-6)' }}>
        <Text tone="secondary">Scroll me — the bar stays pinned.</Text>
      </div>
    </div>
  ),
};
