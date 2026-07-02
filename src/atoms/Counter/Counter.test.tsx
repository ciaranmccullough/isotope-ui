import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Counter } from './Counter';

describe('Counter', () => {
  it('renders a spinbutton with step buttons carrying accessible names', () => {
    render(<Counter aria-label="Quantity" defaultValue={1} />);
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument();
  });

  it('exposes the uncontrolled value through the forwarded ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Counter aria-label="Quantity" defaultValue={5} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.value).toBe('5');
  });

  it('steps up and down via the buttons, respecting step', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<Counter aria-label="Quantity" defaultValue={10} step={5} ref={ref} />);
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(ref.current?.value).toBe('15');
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(ref.current?.value).toBe('5');
  });

  it('clamps at min and max through the native step algorithm', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<Counter aria-label="Quantity" defaultValue={1} min={0} max={2} ref={ref} />);
    const increase = screen.getByRole('button', { name: 'Increase' });
    await user.click(increase);
    await user.click(increase);
    expect(ref.current?.value).toBe('2');
    const decrease = screen.getByRole('button', { name: 'Decrease' });
    await user.click(decrease);
    await user.click(decrease);
    await user.click(decrease);
    expect(ref.current?.value).toBe('0');
  });

  it('notifies onChange listeners when stepping', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Counter aria-label="Quantity" defaultValue={0} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenCalled();
  });

  it('supports custom step-button labels', () => {
    render(
      <Counter aria-label="Guests" decrementLabel="Fewer guests" incrementLabel="More guests" />,
    );
    expect(screen.getByRole('button', { name: 'Fewer guests' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More guests' })).toBeInTheDocument();
  });

  it('disables the input and both buttons together', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<Counter aria-label="Quantity" defaultValue={3} disabled ref={ref} />);
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(ref.current?.value).toBe('3');
  });

  it('submits its value through FormData under the given name', () => {
    render(
      <form data-testid="form" aria-label="Order">
        <Counter aria-label="Quantity" name="quantity" defaultValue={4} />
      </form>,
    );
    const form = screen.getByRole('form', { name: 'Order' });
    expect(new FormData(form as HTMLFormElement).get('quantity')).toBe('4');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Counter aria-label="Quantity" defaultValue={1} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
