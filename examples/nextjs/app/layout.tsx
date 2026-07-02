import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { Footer, Link, List, ListItem, Navbar, Text } from 'isotope-ui';
import 'isotope-ui/styles.css';

export const metadata: Metadata = {
  title: 'isotope-ui × Next.js',
  description: 'Router-agnostic Link and uncontrolled forms, in the App Router.',
};

/**
 * Router-agnostic Link proof: isotope-ui's Link with `asChild` clones next/link, so the
 * library styles it while Next.js owns prefetching and navigation.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Navbar
          brand={
            <Text as="span" weight="semibold">
              ⚛ isotope-ui
            </Text>
          }
        >
          <List direction="horizontal" gap="4">
            <ListItem>
              <Link asChild>
                <NextLink href="/">Home</NextLink>
              </Link>
            </ListItem>
            <ListItem>
              <Link asChild>
                <NextLink href="/signup">Signup</NextLink>
              </Link>
            </ListItem>
          </List>
        </Navbar>
        <main style={{ padding: 'var(--iso-spacing-8)' }}>{children}</main>
        <Footer
          legal={
            <Text as="span" size="xs">
              isotope-ui Next.js example
            </Text>
          }
        />
      </body>
    </html>
  );
}
