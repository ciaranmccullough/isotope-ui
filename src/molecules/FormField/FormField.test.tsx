import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Counter } from '../../atoms/Counter';
import { Input } from '../../atoms/Input';
import { FormField } from './FormField';

describe('FormField', () => {
  it('associates the label with the control so clicking the label focuses it', async () => {
    const user = userEvent.setup();
    render(
      <FormField label="Email">
        <Input name="email" type="email" />
      </FormField>,
    );
    await user.click(screen.getByText('Email'));
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus();
  });

  it('generates an id when none is provided and reuses it for the label wiring', () => {
    render(
      <FormField label="Email">
        <Input name="email" />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('id');
    expect(screen.getByText('Email')).toHaveAttribute('for', input.getAttribute('id') ?? '');
  });

  it('labels a native select through the same htmlFor mechanism', () => {
    render(
      <FormField label="Country">
        <select name="country" defaultValue="ie">
          <option value="ie">Ireland</option>
          <option value="us">United States</option>
        </select>
      </FormField>,
    );
    expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
  });

  it('labels a composed Counter (wiring reaches its inner spinbutton)', () => {
    render(
      <FormField label="Quantity">
        <Counter name="quantity" defaultValue={2} />
      </FormField>,
    );
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toBeInTheDocument();
  });

  it('lists exactly the rendered description and error ids in aria-describedby and shrinks when they are absent', () => {
    const { rerender } = render(
      <FormField
        id="email-field"
        label="Email"
        description="We never share it."
        error="Enter an email address."
      >
        <Input name="email" type="email" />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(screen.getByText('We never share it.')).toHaveAttribute('id', 'email-field-description');
    expect(screen.getByText('Enter an email address.')).toHaveAttribute('id', 'email-field-error');
    expect(input).toHaveAttribute('aria-describedby', 'email-field-description email-field-error');

    rerender(
      <FormField id="email-field" label="Email" description="We never share it.">
        <Input name="email" type="email" />
      </FormField>,
    );
    expect(input).toHaveAttribute('aria-describedby', 'email-field-description');

    rerender(
      <FormField id="email-field" label="Email">
        <Input name="email" type="email" />
      </FormField>,
    );
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('sets aria-invalid on the control only while an error is present', () => {
    const { rerender } = render(
      <FormField label="Email" error="Enter an email address.">
        <Input name="email" />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');

    rerender(
      <FormField label="Email">
        <Input name="email" />
      </FormField>,
    );
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('renders error text without role="alert" (announcement policy belongs to the consumer)', () => {
    render(
      <FormField label="Email" error="Enter an email address.">
        <Input name="email" />
      </FormField>,
    );
    expect(screen.getByText('Enter an email address.')).not.toHaveAttribute('role');
  });

  it('passes required to the control and keeps the asterisk out of the accessible name', () => {
    render(
      <FormField label="Email" required>
        <Input name="email" />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleName('Email');
  });

  it('submits the typed value through FormData under the control name (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(
      <form aria-label="Signup">
        <FormField label="Email">
          <Input name="email" type="email" defaultValue="ada@example.com" />
        </FormField>
      </form>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    await user.clear(input);
    await user.type(input, 'grace@example.com');
    const form = screen.getByRole('form', { name: 'Signup' });
    expect(new FormData(form as HTMLFormElement).get('email')).toBe('grace@example.com');
  });

  it('forwards its ref to the control element, not the wrapper', () => {
    const ref = createRef<HTMLElement>();
    render(
      <FormField label="Email" ref={ref}>
        <Input name="email" defaultValue="ada@example.com" />
      </FormField>,
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect((ref.current as HTMLInputElement).value).toBe('ada@example.com');
  });

  it('preserves a ref the consumer set on the child while forwarding its own', () => {
    const fieldRef = createRef<HTMLElement>();
    const childRef = createRef<HTMLInputElement>();
    render(
      <FormField label="Email" ref={fieldRef}>
        <Input name="email" ref={childRef} />
      </FormField>,
    );
    expect(childRef.current).toBeInstanceOf(HTMLInputElement);
    expect(fieldRef.current).toBe(childRef.current);
  });

  it('lets attributes the consumer set on the child win, except id which FormField owns', () => {
    render(
      <>
        <p id="external-hint">External hint</p>
        <FormField id="field-id" label="Email" description="Shadowed by the child prop">
          <Input name="email" id="child-id" aria-describedby="external-hint" />
        </FormField>
      </>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('id', 'field-id');
    expect(input).toHaveAttribute('aria-describedby', 'external-hint');
  });

  it('has no axe violations without an error', async () => {
    const { container } = render(
      <FormField label="Email" description="We never share it." required>
        <Input name="email" type="email" />
      </FormField>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations with an error', async () => {
    const { container } = render(
      <FormField label="Email" error="Enter an email address.">
        <Input name="email" type="email" defaultValue="not-an-email" />
      </FormField>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
