import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Calendar } from './Calendar';
import type { CalendarSize } from './Calendar.types';

const sizes: CalendarSize[] = ['sm', 'md', 'lg'];

describe('Calendar', () => {
  it('renders a native date input with its accessible name', () => {
    render(<Calendar aria-label="Birthday" />);
    const input = screen.getByLabelText('Birthday');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  it('renders a datetime-local input when type is datetime-local', () => {
    render(<Calendar type="datetime-local" aria-label="Appointment" />);
    expect(screen.getByLabelText('Appointment')).toHaveAttribute('type', 'datetime-local');
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(<Calendar size={size} aria-label={`${size} date`} />);
    expect(screen.getByLabelText(`${size} date`)).toBeInTheDocument();
  });

  it('forwards its ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Calendar ref={ref} aria-label="Birthday" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByLabelText('Birthday'));
  });

  it('is uncontrolled: a date defaultValue is readable through the ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Calendar ref={ref} aria-label="Birthday" defaultValue="2026-07-05" />);
    expect(ref.current).toHaveValue('2026-07-05');
  });

  it('is uncontrolled: a datetime-local defaultValue is readable through the ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Calendar
        ref={ref}
        type="datetime-local"
        aria-label="Appointment"
        defaultValue="2026-07-05T10:30"
      />,
    );
    expect(ref.current).toHaveValue('2026-07-05T10:30');
  });

  it('fires onChange when edited, and the new value reads through the ref', () => {
    const ref = createRef<HTMLInputElement>();
    const onChange = jest.fn();
    render(<Calendar ref={ref} aria-label="Birthday" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Birthday'), { target: { value: '2026-01-01' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(ref.current).toHaveValue('2026-01-01');
  });

  it('submits its value through FormData under the given name', () => {
    render(
      <form aria-label="Booking">
        <Calendar aria-label="Day" name="day" defaultValue="2026-07-05" />
      </form>,
    );
    const form = screen.getByRole('form', { name: 'Booking' });
    expect(new FormData(form as HTMLFormElement).get('day')).toBe('2026-07-05');
  });

  it('passes min and max through to the native input', () => {
    render(<Calendar aria-label="Day" min="2026-07-01" max="2026-07-31" />);
    const input = screen.getByLabelText('Day');
    expect(input).toHaveAttribute('min', '2026-07-01');
    expect(input).toHaveAttribute('max', '2026-07-31');
  });

  it('sets aria-invalid when invalid', () => {
    render(<Calendar invalid aria-label="Birthday" />);
    expect(screen.getByLabelText('Birthday')).toHaveAttribute('aria-invalid', 'true');
  });

  it('omits aria-invalid when not invalid', () => {
    render(<Calendar aria-label="Birthday" />);
    expect(screen.getByLabelText('Birthday')).not.toHaveAttribute('aria-invalid');
  });

  it('uses the real disabled attribute', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Calendar ref={ref} disabled aria-label="Birthday" defaultValue="2026-07-05" />);
    expect(screen.getByLabelText('Birthday')).toBeDisabled();
    expect(ref.current).toHaveValue('2026-07-05');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Calendar aria-label="Date" />
        <Calendar aria-label="When" type="datetime-local" />
        <Calendar aria-label="Small invalid" size="sm" invalid />
        <Calendar aria-label="Disabled" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
