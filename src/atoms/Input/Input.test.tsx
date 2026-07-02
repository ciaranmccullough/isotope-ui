import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Input } from './Input';
import type { InputSize } from './Input.types';

const sizes: InputSize[] = ['sm', 'md', 'lg'];

describe('Input', () => {
  it('renders a native text input with its accessible name', () => {
    render(<Input aria-label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(<Input size={size} aria-label={`${size} input`} />);
    expect(screen.getByRole('textbox', { name: `${size} input` })).toBeInTheDocument();
  });

  it('renders non-text types with their proper roles', () => {
    render(
      <>
        <Input type="search" aria-label="Search" />
        <Input type="number" aria-label="Amount" />
      </>,
    );
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Amount' })).toBeInTheDocument();
  });

  it('forwards its ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Name" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Name' }));
  });

  it('is uncontrolled: a typed value is readable through the ref', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Name" defaultValue="Iso" />);
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'tope');
    expect(ref.current).toHaveValue('Isotope');
  });

  it('fires onChange while typing', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Input aria-label="Name" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'abc');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('sets aria-invalid when invalid', () => {
    render(<Input invalid aria-label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('omits aria-invalid when not invalid', () => {
    render(<Input aria-label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute('aria-invalid');
  });

  it('maps htmlSize to the native char-width size attribute', () => {
    render(<Input htmlSize={12} aria-label="Code" />);
    expect(screen.getByRole('textbox', { name: 'Code' })).toHaveAttribute('size', '12');
  });

  it('does not accept typing when disabled', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} disabled aria-label="Name" />);
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'abc');
    expect(ref.current).toHaveValue('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Input aria-label="Default" />
        <Input aria-label="Small invalid" size="sm" invalid />
        <Input aria-label="Disabled" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
