import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Navbar } from './Navbar';
import { Link } from '../../atoms/Link';
import { Button } from '../../atoms/Button';
import { List } from '../../molecules/List';
import { ListItem } from '../../atoms/ListItem';

function renderFull() {
  return render(
    <Navbar brand={<span>isotope</span>} actions={<Button size="sm">Sign in</Button>}>
      <List direction="horizontal" gap="4">
        <ListItem>
          <Link href="/docs">Docs</Link>
        </ListItem>
        <ListItem>
          <Link href="/tokens">Tokens</Link>
        </ListItem>
      </List>
    </Navbar>,
  );
}

describe('Navbar', () => {
  it('is a navigation landmark named "Main" by default', () => {
    renderFull();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  it('accepts a custom accessible name', () => {
    render(<Navbar aria-label="Primary" />);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('renders brand, nav items, and actions slots', () => {
    renderFull();
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByText('isotope')).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Docs' })).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('renders sticky mode', () => {
    render(<Navbar sticky aria-label="Sticky nav" />);
    expect(screen.getByRole('navigation', { name: 'Sticky nav' })).toBeInTheDocument();
  });

  it('forwards its ref to the nav element', () => {
    const ref = createRef<HTMLElement>();
    render(<Navbar ref={ref} />);
    expect(ref.current?.tagName).toBe('NAV');
  });

  it('has no axe violations', async () => {
    const { container } = renderFull();
    expect(await axe(container)).toHaveNoViolations();
  });
});
