import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { RadioButton } from '../../atoms/RadioButton';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupDirection } from './RadioGroup.types';

const directions: RadioGroupDirection[] = ['vertical', 'horizontal'];

describe('RadioGroup', () => {
  it('renders a group whose accessible name comes from the legend', () => {
    render(
      <RadioGroup legend="Plan" name="plan">
        <RadioButton value="hobby">Hobby</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('group', { name: 'Plan' })).toBeInTheDocument();
  });

  it('injects the shared name into every RadioButton child', () => {
    render(
      <RadioGroup legend="Plan" name="plan">
        <RadioButton value="hobby">Hobby</RadioButton>
        <RadioButton value="pro">Pro</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Hobby' })).toHaveAttribute('name', 'plan');
    expect(screen.getByRole('radio', { name: 'Pro' })).toHaveAttribute('name', 'plan');
  });

  it("respects a child's own explicit name (consumer override wins)", () => {
    render(
      <RadioGroup legend="Plan" name="plan">
        <RadioButton value="hobby">Hobby</RadioButton>
        <RadioButton name="other" value="pro">
          Pro
        </RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Hobby' })).toHaveAttribute('name', 'plan');
    expect(screen.getByRole('radio', { name: 'Pro' })).toHaveAttribute('name', 'other');
  });

  it('submits a single value under the shared name via FormData (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(
      <form aria-label="Signup">
        <RadioGroup legend="Plan" name="plan">
          <RadioButton value="hobby">Hobby</RadioButton>
          <RadioButton value="pro">Pro</RadioButton>
          <RadioButton value="enterprise">Enterprise</RadioButton>
        </RadioGroup>
      </form>,
    );
    const form = screen.getByRole<HTMLFormElement>('form', { name: 'Signup' });

    expect(new FormData(form).get('plan')).toBeNull();

    await user.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(new FormData(form).getAll('plan')).toEqual(['pro']);

    await user.click(screen.getByRole('radio', { name: 'Enterprise' }));
    expect(new FormData(form).getAll('plan')).toEqual(['enterprise']);
  });

  it('keeps mutual exclusion native — selecting a second radio unchecks the first', async () => {
    const user = userEvent.setup();
    const hobbyRef = createRef<HTMLInputElement>();
    const proRef = createRef<HTMLInputElement>();
    render(
      <RadioGroup legend="Plan" name="plan">
        <RadioButton ref={hobbyRef} value="hobby">
          Hobby
        </RadioButton>
        <RadioButton ref={proRef} value="pro">
          Pro
        </RadioButton>
      </RadioGroup>,
    );

    await user.click(screen.getByRole('radio', { name: 'Hobby' }));
    expect(hobbyRef.current?.checked).toBe(true);
    expect(proRef.current?.checked).toBe(false);

    await user.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(hobbyRef.current?.checked).toBe(false);
    expect(proRef.current?.checked).toBe(true);
  });

  it.each(['sm', 'md', 'lg'] as const)('renders with the %s size passed down', (size) => {
    render(
      <RadioGroup legend={`Size ${size}`} name={`sizes-${size}`} size={size}>
        <RadioButton value="a">Option A</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('group', { name: `Size ${size}` })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
  });

  it.each(directions)('renders the %s direction', (direction) => {
    render(
      <RadioGroup legend={`Plan ${direction}`} name={`plan-${direction}`} direction={direction}>
        <RadioButton value="hobby">Hobby</RadioButton>
        <RadioButton value="pro">Pro</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('group', { name: `Plan ${direction}` })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('passes non-RadioButton children through untouched', () => {
    render(
      <RadioGroup legend="Plan" name="plan">
        <RadioButton value="hobby">Hobby</RadioButton>
        <p>Prices exclude tax.</p>
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Hobby' })).toBeInTheDocument();
    expect(screen.getByText('Prices exclude tax.')).toBeInTheDocument();
  });

  it('renders error text and wires it to the fieldset via aria-describedby', () => {
    render(
      <RadioGroup legend="Plan" name="plan" error="Choose a plan.">
        <RadioButton value="hobby">Hobby</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('group', { name: 'Plan' })).toHaveAccessibleDescription(
      'Choose a plan.',
    );
  });

  it('merges a consumer aria-describedby with the error id', () => {
    render(
      <>
        <p id="plan-hint">Pick what fits.</p>
        <RadioGroup legend="Plan" name="plan" error="Choose a plan." aria-describedby="plan-hint">
          <RadioButton value="hobby">Hobby</RadioButton>
        </RadioGroup>
      </>,
    );
    expect(screen.getByRole('group', { name: 'Plan' })).toHaveAccessibleDescription(
      'Pick what fits. Choose a plan.',
    );
  });

  it('has no accessible description when error is not set', () => {
    render(
      <RadioGroup legend="Plan" name="plan">
        <RadioButton value="hobby">Hobby</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('group', { name: 'Plan' })).not.toHaveAccessibleDescription();
  });

  it('forwards its ref to the native fieldset element', () => {
    const ref = createRef<HTMLFieldSetElement>();
    render(
      <RadioGroup ref={ref} legend="Plan" name="plan">
        <RadioButton value="hobby">Hobby</RadioButton>
      </RadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it('disables every radio natively when the fieldset is disabled', () => {
    render(
      <RadioGroup legend="Plan" name="plan" disabled>
        <RadioButton value="hobby">Hobby</RadioButton>
        <RadioButton value="pro">Pro</RadioButton>
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Hobby' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeDisabled();
  });

  it('has no axe violations in either direction (including error state)', async () => {
    const { container } = render(
      <>
        <RadioGroup legend="Vertical" name="axe-vertical" error="Choose one.">
          <RadioButton value="a">Option A</RadioButton>
          <RadioButton value="b" defaultChecked>
            Option B
          </RadioButton>
        </RadioGroup>
        <RadioGroup legend="Horizontal" name="axe-horizontal" direction="horizontal" size="sm">
          <RadioButton value="a">Option A</RadioButton>
          <RadioButton value="b">Option B</RadioButton>
        </RadioGroup>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
