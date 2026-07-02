import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';
import { Link } from './Link';
import type { LinkTone, LinkUnderline } from './Link.types';

const tones: LinkTone[] = ['link', 'inherit'];
const underlines: LinkUnderline[] = ['hover', 'always', 'none'];

/** Stand-in for a framework router link (React Router, Next.js…) used by the AsChild story. */
type RouterLikeLinkProps = { to: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>;

function RouterLikeLink({ to, children, ...rest }: RouterLikeLinkProps) {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}

const meta = {
  title: 'Atoms/Link',
  component: Link,
  args: {
    children: 'Isotope documentation',
    href: 'https://example.com/docs',
    tone: 'link',
    underline: 'hover',
    external: false,
    asChild: false,
  },
  argTypes: {
    tone: { control: 'select', options: tones },
    underline: { control: 'select', options: underlines },
    external: { control: 'boolean' },
    asChild: { control: false },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ToneUnderlineMatrix: Story = {
  render: () => (
    <table>
      <thead>
        <tr>
          <th scope="col">tone</th>
          {underlines.map((underline) => (
            <th scope="col" key={underline}>
              {underline}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tones.map((tone) => (
          <tr key={tone}>
            <th scope="row">{tone}</th>
            {underlines.map((underline) => (
              <td key={underline} style={{ padding: 'var(--iso-spacing-2)' }}>
                <Link href="https://example.com/docs" tone={tone} underline={underline}>
                  Link
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const InheritToneInText: Story = {
  render: () => (
    <p style={{ color: 'var(--iso-color-text-secondary)' }}>
      The inherit tone picks up the surrounding color:{' '}
      <Link href="https://example.com/docs" tone="inherit" underline="always">
        a link inside secondary text
      </Link>
      , while the default tone{' '}
      <Link href="https://example.com/docs" underline="always">
        stays link-colored
      </Link>
      .
    </p>
  ),
};

export const External: Story = {
  args: {
    external: true,
    children: 'Opens in a new tab (target="_blank" rel="noreferrer")',
  },
};

export const AsChildRouterLink: Story = {
  render: () => (
    <Link asChild underline="always">
      <RouterLikeLink to="/dashboard">Framework link styled via asChild</RouterLikeLink>
    </Link>
  ),
};
