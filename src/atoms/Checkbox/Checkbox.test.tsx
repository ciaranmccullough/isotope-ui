import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Checkbox } from './Checkbox';
import type { CheckboxSize } from './Checkbox.types';

const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];

describe('Checkbox', () => {
  it('renders a native checkbox with its accessible name from the wrapping label', () => {
    render(<Checkbox name="terms">Accept terms</Checkbox>);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(
      <Checkbox name="sized" size={size}>
        {size}
      </Checkbox>,
    );
    expect(screen.getByRole('checkbox', { name: size })).toBeInTheDocument();
  });

  it('forwards its ref to the native checkbox input', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox ref={ref} name="terms" value="accepted">
        Accept terms
      </Checkbox>,
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('type', 'checkbox');
    expect(ref.current?.value).toBe('accepted');
  });

  it('reads defaultChecked through the ref (uncontrolled)', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox ref={ref} name="terms" defaultChecked>
        Accept terms
      </Checkbox>,
    );
    expect(ref.current?.checked).toBe(true);
  });

  it('toggles on click and reports the state through the ref', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox ref={ref} name="terms">
        Accept terms
      </Checkbox>,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));
    expect(ref.current?.checked).toBe(true);

    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));
    expect(ref.current?.checked).toBe(false);
  });

  it('fires onChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Checkbox name="terms" onChange={onChange}>
        Accept terms
      </Checkbox>,
    );
    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('submits its value through FormData under the given name only while checked', () => {
    render(
      <form aria-label="Signup">
        <Checkbox name="newsletter" value="yes" defaultChecked>
          Newsletter
        </Checkbox>
        <Checkbox name="marketing" value="yes">
          Marketing
        </Checkbox>
      </form>,
    );
    const form = screen.getByRole('form', { name: 'Signup' });
    const data = new FormData(form as HTMLFormElement);
    expect(data.get('newsletter')).toBe('yes');
    expect(data.get('marketing')).toBeNull();
  });

  it('exposes the mixed state when indeterminate is set through the ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox ref={ref} name="select-all">
        Select all
      </Checkbox>,
    );
    if (ref.current) {
      ref.current.indeterminate = true;
    }
    expect(screen.getByRole('checkbox', { name: 'Select all' })).toBePartiallyChecked();
  });

  it('cannot be toggled and fires no onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox ref={ref} name="terms" onChange={onChange} disabled>
        Accept terms
      </Checkbox>,
    );
    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));
    expect(ref.current?.checked).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Checkbox name="axe-a" size="sm">
          Option A
        </Checkbox>
        <Checkbox name="axe-b" defaultChecked>
          Option B
        </Checkbox>
        <Checkbox name="axe-c" disabled>
          Option C
        </Checkbox>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
