import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Switch } from './Switch';
import type { SwitchSize } from './Switch.types';

const sizes: SwitchSize[] = ['sm', 'md', 'lg'];

describe('Switch', () => {
  it('renders a switch whose accessible name comes from the label text', () => {
    render(<Switch>Enable notifications</Switch>);
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeInTheDocument();
  });

  it('takes its accessible name from aria-label when rendered without children', () => {
    render(<Switch aria-label="Enable notifications" />);
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeInTheDocument();
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(<Switch size={size}>{`size-${size}`}</Switch>);
    expect(screen.getByRole('switch', { name: `size-${size}` })).toBeInTheDocument();
  });

  it('forwards its ref to the native checkbox input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref}>Enable notifications</Switch>);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('type', 'checkbox');
  });

  it('toggles uncontrolled state readable through the ref', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref}>Enable notifications</Switch>);
    const control = screen.getByRole('switch', { name: 'Enable notifications' });
    expect(ref.current?.checked).toBe(false);
    await user.click(control);
    expect(ref.current?.checked).toBe(true);
    await user.click(control);
    expect(ref.current?.checked).toBe(false);
  });

  it('respects defaultChecked', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Switch ref={ref} defaultChecked>
        Enable notifications
      </Switch>,
    );
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeChecked();
    expect(ref.current?.checked).toBe(true);
  });

  it('fires onChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Switch onChange={onChange}>Enable notifications</Switch>);
    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not toggle or fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <Switch ref={ref} onChange={onChange} disabled>
        Enable notifications
      </Switch>,
    );
    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(ref.current?.checked).toBe(false);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Switch>Default</Switch>
        <Switch size="sm" defaultChecked>
          Small checked
        </Switch>
        <Switch disabled>Disabled</Switch>
        <Switch aria-label="No visible label" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
