import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { Link } from '../../atoms/Link';
import { ListItem } from '../../atoms/ListItem';
import { Text } from '../../atoms/Text';
import { List } from '../../molecules/List';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

function Column({ title, links }: { title: string; links: string[] }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-3)' }}>
      <Text as="h2" size="sm" weight="semibold">
        {title}
      </Text>
      <List gap="2">
        {links.map((label) => (
          <ListItem key={label}>
            <Link href={`#${label.toLowerCase()}`} tone="inherit" underline="hover">
              {label}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export const Full: Story = {
  render: () => (
    <Footer
      legal={
        <>
          <Text as="span" size="xs">
            © 2026 isotope-ui contributors
          </Text>
          <Link href="#license" tone="inherit" underline="always">
            MIT License
          </Link>
        </>
      }
    >
      <Column title="Docs" links={['Tokens', 'Variants', 'Architecture']} />
      <Column title="Community" links={['GitHub', 'Issues', 'Contributing']} />
      <Column title="More" links={['Storybook', 'Changelog']} />
    </Footer>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Footer
      legal={
        <Text as="span" size="xs">
          © 2026 isotope-ui contributors
        </Text>
      }
    />
  ),
};
