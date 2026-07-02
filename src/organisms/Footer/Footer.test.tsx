import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Footer } from './Footer';
import { Link } from '../../atoms/Link';
import { ListItem } from '../../atoms/ListItem';
import { Text } from '../../atoms/Text';
import { List } from '../../molecules/List';

function renderFull() {
  return render(
    <Footer
      legal={
        <Text as="span" size="xs">
          © 2026 isotope-ui
        </Text>
      }
    >
      <div>
        <Text as="h2" size="sm" weight="semibold">
          Resources
        </Text>
        <List gap="2">
          <ListItem>
            <Link href="/docs">Docs</Link>
          </ListItem>
          <ListItem>
            <Link href="/tokens">Tokens</Link>
          </ListItem>
        </List>
      </div>
    </Footer>,
  );
}

describe('Footer', () => {
  it('is a contentinfo landmark at page level', () => {
    renderFull();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders children columns and the legal slot', () => {
    renderFull();
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: 'Docs' })).toBeInTheDocument();
    expect(within(footer).getByText('© 2026 isotope-ui')).toBeInTheDocument();
  });

  it('renders without a legal slot', () => {
    render(<Footer>columns</Footer>);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('columns');
  });

  it('forwards its ref to the footer element', () => {
    const ref = createRef<HTMLElement>();
    render(<Footer ref={ref} />);
    expect(ref.current?.tagName).toBe('FOOTER');
  });

  it('has no axe violations', async () => {
    const { container } = renderFull();
    expect(await axe(container)).toHaveNoViolations();
  });
});
