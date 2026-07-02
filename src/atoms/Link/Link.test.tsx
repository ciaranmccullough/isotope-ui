import { createRef } from 'react';
import type { MouseEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Link } from './Link';
import type { LinkTone, LinkUnderline } from './Link.types';

const tones: LinkTone[] = ['link', 'inherit'];
const underlines: LinkUnderline[] = ['hover', 'always', 'none'];

describe('Link', () => {
  it('renders a native link with its accessible name and passes href through', () => {
    render(<Link href="https://example.com/docs">Docs</Link>);
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'href',
      'https://example.com/docs',
    );
  });

  it.each(tones)('renders the %s tone in every underline variant', (tone) => {
    for (const underline of underlines) {
      const name = `${tone}-${underline}`;
      const { unmount } = render(
        <Link href="/docs" tone={tone} underline={underline}>
          {name}
        </Link>,
      );
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
      unmount();
    }
  });

  it('does not set target or rel unless asked to', () => {
    render(<Link href="/docs">Internal</Link>);
    const link = screen.getByRole('link', { name: 'Internal' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('external sets target="_blank" and rel="noreferrer"', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('external merges noreferrer into a consumer-provided rel without duplicating', () => {
    render(
      <Link href="https://example.com" external rel="me noreferrer nofollow">
        Profile
      </Link>,
    );
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute(
      'rel',
      'me noreferrer nofollow',
    );
  });

  it('asChild renders the child element itself, merging className and props (no nested <a>)', () => {
    render(
      <Link asChild underline="always" className="consumer-class" data-flag="from-link">
        <a href="/spa-route" className="child-class">
          Dashboard
        </a>
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(link).toHaveAttribute('href', '/spa-route');
    expect(link).toHaveClass('consumer-class');
    expect(link).toHaveClass('child-class');
    expect(link).toHaveAttribute('data-flag', 'from-link');
  });

  it('asChild applies external target/rel to the child element', () => {
    render(
      <Link asChild external>
        <a href="https://example.com">Elsewhere</a>
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'Elsewhere' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('asChild throws a clear error when the child is not a single valid element', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() =>
      render(
        <Link asChild href="/docs">
          plain text
        </Link>,
      ),
    ).toThrow(/asChild.*single valid React element/);
    consoleError.mockRestore();
  });

  it('forwards its ref to the native anchor element', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link ref={ref} href="/docs">
        Docs
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toHaveTextContent('Docs');
  });

  it('fires onClick when activated', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn((event: MouseEvent<HTMLAnchorElement>) => event.preventDefault());
    render(
      <Link href="/docs" onClick={onClick}>
        Docs
      </Link>,
    );
    await user.click(screen.getByRole('link', { name: 'Docs' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <p>
        Read the{' '}
        <Link href="https://example.com/docs" external>
          documentation
        </Link>{' '}
        or the{' '}
        <Link href="/changelog" tone="inherit" underline="always">
          changelog
        </Link>
        .
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
