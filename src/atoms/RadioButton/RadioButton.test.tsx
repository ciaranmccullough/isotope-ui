import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { RadioButton } from './RadioButton';
import type { RadioButtonSize } from './RadioButton.types';

const sizes: RadioButtonSize[] = ['sm', 'md'];

describe('RadioButton', () => {
  it('renders a native radio with its accessible name from the wrapping label', () => {
    render(<RadioButton name="plan">Hobby</RadioButton>);
    expect(screen.getByRole('radio', { name: 'Hobby' })).toBeInTheDocument();
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(
      <RadioButton name="sized" size={size}>
        {size}
      </RadioButton>,
    );
    expect(screen.getByRole('radio', { name: size })).toBeInTheDocument();
  });

  it('forwards its ref to the native radio input', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <RadioButton ref={ref} name="plan" value="pro">
        Pro
      </RadioButton>,
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('type', 'radio');
    expect(ref.current?.value).toBe('pro');
  });

  it('reads defaultChecked through the ref (uncontrolled)', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <RadioButton ref={ref} name="plan" value="pro" defaultChecked>
        Pro
      </RadioButton>,
    );
    expect(ref.current?.checked).toBe(true);
  });

  it('behaves as a group when two RadioButtons share a name', async () => {
    const user = userEvent.setup();
    const hobbyRef = createRef<HTMLInputElement>();
    const proRef = createRef<HTMLInputElement>();
    render(
      <>
        <RadioButton ref={hobbyRef} name="plan" value="hobby">
          Hobby
        </RadioButton>
        <RadioButton ref={proRef} name="plan" value="pro">
          Pro
        </RadioButton>
      </>,
    );

    await user.click(screen.getByRole('radio', { name: 'Hobby' }));
    expect(hobbyRef.current?.checked).toBe(true);
    expect(proRef.current?.checked).toBe(false);

    await user.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(hobbyRef.current?.checked).toBe(false);
    expect(proRef.current?.checked).toBe(true);
  });

  it('fires onChange when selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <RadioButton name="plan" value="pro" onChange={onChange}>
        Pro
      </RadioButton>,
    );
    await user.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('cannot be selected and fires no onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <RadioButton ref={ref} name="plan" value="pro" onChange={onChange} disabled>
        Pro
      </RadioButton>,
    );
    await user.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(ref.current?.checked).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <RadioButton name="axe" value="a" size="sm">
          Option A
        </RadioButton>
        <RadioButton name="axe" value="b" defaultChecked>
          Option B
        </RadioButton>
        <RadioButton name="axe" value="c" disabled>
          Option C
        </RadioButton>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
