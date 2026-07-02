import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Progress } from './Progress';
import type { ProgressSize, ProgressTone } from './Progress.types';

const tones: ProgressTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];
const sizes: ProgressSize[] = ['sm', 'md'];

describe('Progress', () => {
  it('renders a native progressbar with its accessible name', () => {
    render(<Progress aria-label="Upload progress" value={40} />);
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeInTheDocument();
  });

  it('reflects value and max (the native mapping behind aria-valuenow/aria-valuemax)', () => {
    render(<Progress aria-label="Upload progress" value={40} />);
    const bar = screen.getByRole('progressbar', { name: 'Upload progress' });
    expect(bar).toHaveAttribute('value', '40');
    expect(bar).toHaveAttribute('max', '100');
    expect((bar as HTMLProgressElement).position).toBeCloseTo(0.4);
  });

  it('defaults max to 100 and respects an explicit max', () => {
    render(
      <>
        <Progress aria-label="Default max" value={5} />
        <Progress aria-label="Custom max" value={5} max={8} />
      </>,
    );
    expect(screen.getByRole('progressbar', { name: 'Default max' })).toHaveAttribute('max', '100');
    expect(screen.getByRole('progressbar', { name: 'Custom max' })).toHaveAttribute('max', '8');
  });

  it('renders the native indeterminate state when value is absent', () => {
    render(<Progress aria-label="Loading" />);
    const bar = screen.getByRole('progressbar', { name: 'Loading' });
    expect(bar).not.toHaveAttribute('value');
    expect((bar as HTMLProgressElement).position).toBe(-1);
  });

  it.each(tones)('renders the %s tone in every size', (tone) => {
    for (const size of sizes) {
      const name = `${tone}-${size}`;
      const { unmount } = render(<Progress tone={tone} size={size} value={50} aria-label={name} />);
      expect(screen.getByRole('progressbar', { name })).toBeInTheDocument();
      unmount();
    }
  });

  it('forwards its ref to the native progress element and exposes the current value', () => {
    const ref = createRef<HTMLProgressElement>();
    render(<Progress ref={ref} aria-label="Upload progress" value={25} />);
    expect(ref.current).toBeInstanceOf(HTMLProgressElement);
    expect(ref.current?.value).toBe(25);
    expect(ref.current?.max).toBe(100);
  });

  it('spreads remaining native props, so handlers like onClick fire', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Progress aria-label="Upload progress" value={40} onClick={onClick} />);
    await user.click(screen.getByRole('progressbar', { name: 'Upload progress' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Progress aria-label="Default" value={40} />
        <Progress aria-label="Variant" tone="positive" size="sm" value={80} />
        <Progress aria-label="Indeterminate" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
