import { Outlet, Link as RouterLink } from 'react-router';
import { Footer, Link, List, ListItem, Navbar, Text } from 'isotope-ui';

/**
 * Router-agnostic Link proof: isotope-ui's Link with `asChild` clones the React Router Link,
 * so the library styles it while the router owns navigation — no router dependency in the
 * library.
 */
export function App() {
  return (
    <>
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
              <RouterLink to="/">Home</RouterLink>
            </Link>
          </ListItem>
          <ListItem>
            <Link asChild>
              <RouterLink to="/signup">Signup</RouterLink>
            </Link>
          </ListItem>
        </List>
      </Navbar>
      <main style={{ padding: 'var(--iso-spacing-8)' }}>
        <Outlet />
      </main>
      <Footer
        legal={
          <Text as="span" size="xs">
            isotope-ui React Router example
          </Text>
        }
      />
    </>
  );
}
