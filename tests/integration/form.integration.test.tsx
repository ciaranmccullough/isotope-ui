import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from '../../src/atoms/Button';
import { Counter } from '../../src/atoms/Counter';
import { Input } from '../../src/atoms/Input';
import { RadioButton } from '../../src/atoms/RadioButton';
import { FormField } from '../../src/molecules/FormField';
import { RadioGroup } from '../../src/molecules/RadioGroup';
import { Select } from '../../src/molecules/Select';

interface OrderFormProps {
  onSubmit?: (data: FormData) => void;
  withErrors?: boolean;
}

/**
 * The composed molecules-tier flow under test: FormField wiring an Input, a Select, and a
 * Counter, plus a RadioGroup of RadioButtons — everything uncontrolled, submitted natively,
 * values read through `FormData` in the submit handler.
 */
function OrderForm({ onSubmit, withErrors = false }: OrderFormProps) {
  return (
    <form
      aria-label="Order"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(new FormData(event.currentTarget));
      }}
    >
      <FormField label="Full name" error={withErrors ? 'Enter your full name.' : undefined}>
        <Input name="fullName" />
      </FormField>
      <FormField
        label="Country"
        description="Where the order ships."
        error={withErrors ? 'Choose a country.' : undefined}
      >
        <Select name="country" defaultValue="">
          <option value="" disabled>
            Choose a country
          </option>
          <option value="ie">Ireland</option>
          <option value="us">United States</option>
          <option value="jp">Japan</option>
        </Select>
      </FormField>
      <RadioGroup
        legend="Shipping speed"
        name="shipping"
        error={withErrors ? 'Choose a shipping speed.' : undefined}
      >
        <RadioButton value="standard" defaultChecked>
          Standard
        </RadioButton>
        <RadioButton value="express">Express</RadioButton>
      </RadioGroup>
      <FormField label="Quantity">
        <Counter name="quantity" defaultValue={1} min={1} max={5} />
      </FormField>
      <Button type="submit">Place order</Button>
    </form>
  );
}

describe('form composition (FormField + Select + RadioGroup + Counter)', () => {
  it('submits the uncontrolled composition and yields exactly the filled values via FormData', async () => {
    const user = userEvent.setup();
    let submitted: Array<[string, FormDataEntryValue]> | undefined;
    const onSubmit = jest.fn((data: FormData) => {
      submitted = [...data.entries()];
    });
    render(<OrderForm onSubmit={onSubmit} />);

    await user.type(screen.getByRole('textbox', { name: 'Full name' }), 'Grace Hopper');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Country' }), 'ie');
    await user.click(screen.getByRole('radio', { name: 'Express' }));
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    await user.click(screen.getByRole('button', { name: 'Place order' }));

    // Exactly one submission: the Counter's step Buttons default to type="button" and must not
    // submit the surrounding form.
    expect(onSubmit).toHaveBeenCalledTimes(1);
    // Exact entries in DOM order — a single radio value proves native mutual exclusion, and
    // '2' proves the Counter stepped its uncontrolled input from the default of 1.
    expect(submitted).toEqual([
      ['fullName', 'Grace Hopper'],
      ['country', 'ie'],
      ['shipping', 'express'],
      ['quantity', '2'],
    ]);
  });

  it('focuses each composed control when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<OrderForm />);

    await user.click(screen.getByText('Full name'));
    expect(screen.getByRole('textbox', { name: 'Full name' })).toHaveFocus();

    await user.click(screen.getByText('Country'));
    expect(screen.getByRole('combobox', { name: 'Country' })).toHaveFocus();

    // FormField's htmlFor wiring must reach through Counter's wrapper to its inner number input.
    await user.click(screen.getByText('Quantity'));
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toHaveFocus();

    // RadioButton associates implicitly by wrapping; clicking the text selects the radio.
    await user.click(screen.getByText('Express'));
    expect(screen.getByRole('radio', { name: 'Express' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Standard' })).not.toBeChecked();
  });

  it('resolves every aria-describedby to the rendered description and error text', () => {
    render(<OrderForm withErrors />);

    const fullName = screen.getByRole('textbox', { name: 'Full name' });
    expect(fullName).toHaveAccessibleDescription('Enter your full name.');
    expect(fullName).toBeInvalid();

    // Description and error paragraphs both render, so both feed the accessible description.
    const country = screen.getByRole('combobox', { name: 'Country' });
    expect(country).toHaveAccessibleDescription('Where the order ships. Choose a country.');
    expect(country).toBeInvalid();

    const shipping = screen.getByRole('group', { name: 'Shipping speed' });
    expect(shipping).toHaveAccessibleDescription('Choose a shipping speed.');
  });

  it('has no axe violations across the composed form', async () => {
    const { container } = render(<OrderForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations with every error shown', async () => {
    const { container } = render(<OrderForm withErrors />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
