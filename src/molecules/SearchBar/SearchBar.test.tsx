import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { SearchBar } from './SearchBar';
import type { SearchBarSize } from './SearchBar.types';

const sizes: SearchBarSize[] = ['sm', 'md', 'lg'];

describe('SearchBar', () => {
  it('renders a search landmark and a searchbox, both named "Search" by default', () => {
    render(<SearchBar />);
    expect(screen.getByRole('search', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('names both the landmark and the searchbox from the label prop', () => {
    render(<SearchBar label="Search candidates" />);
    expect(screen.getByRole('search', { name: 'Search candidates' })).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search candidates' })).toBeInTheDocument();
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(<SearchBar label={size} size={size} />);
    expect(screen.getByRole('searchbox', { name: size })).toBeInTheDocument();
  });

  it('forwards its ref to the native search input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<SearchBar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('type', 'search');
  });

  it('reads the typed query through the ref (uncontrolled)', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<SearchBar ref={ref} />);
    await user.type(screen.getByRole('searchbox'), 'react');
    expect(ref.current?.value).toBe('react');
  });

  it('respects defaultValue', () => {
    const ref = createRef<HTMLInputElement>();
    render(<SearchBar ref={ref} defaultValue="design systems" />);
    expect(ref.current?.value).toBe('design systems');
  });

  it('submits natively on Enter and exposes the query through FormData', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      expect(new FormData(event.currentTarget).get('q')).toBe('react');
    });
    render(<SearchBar name="q" onSubmit={onSubmit} />);

    await user.type(screen.getByRole('searchbox'), 'react{enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('fires onChange while typing', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<SearchBar onChange={onChange} />);
    await user.type(screen.getByRole('searchbox'), 'abc');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('renders the shortcut hint as visual-only (aria-hidden), and only when provided', () => {
    const { rerender } = render(<SearchBar />);
    expect(screen.queryByText('⌘K')).toBeNull();

    rerender(<SearchBar shortcutHint="⌘K" />);
    const hint = screen.getByText('⌘K');
    expect(hint.tagName).toBe('KBD');
    expect(hint.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('maps invalid to aria-invalid on the searchbox', () => {
    render(<SearchBar invalid />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when valid', () => {
    render(<SearchBar />);
    expect(screen.getByRole('searchbox')).not.toHaveAttribute('aria-invalid');
  });

  it('blocks typing when disabled', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<SearchBar ref={ref} disabled />);
    await user.type(screen.getByRole('searchbox'), 'react');
    expect(ref.current?.value).toBe('');
  });

  it('merges className and style onto the root form', () => {
    render(<SearchBar className="consumer" style={{ inlineSize: '100%' }} />);
    const form = screen.getByRole('search');
    expect(form).toHaveClass('consumer');
    expect(form).toHaveStyle({ inlineSize: '100%' });
  });

  it('passes action through for zero-JS GET search', () => {
    render(<SearchBar action="/search" name="q" />);
    expect(screen.getByRole('search')).toHaveAttribute('action', '/search');
  });

  it('has no axe violations, fully loaded', async () => {
    const { container } = render(
      <SearchBar label="Search jobs" name="q" placeholder="Search…" shortcutHint="⌘K" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
