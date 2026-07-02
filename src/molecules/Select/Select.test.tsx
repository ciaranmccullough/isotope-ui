import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Select } from './Select';
import type { SelectSize } from './Select.types';

const sizes: SelectSize[] = ['sm', 'md', 'lg'];

const fruitOptions = (
  <>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry">Cherry</option>
  </>
);

describe('Select', () => {
  it('renders a native select as a combobox with its accessible name', () => {
    render(<Select aria-label="Fruit">{fruitOptions}</Select>);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(
      <Select size={size} aria-label={`${size} select`}>
        {fruitOptions}
      </Select>,
    );
    expect(screen.getByRole('combobox', { name: `${size} select` })).toBeInTheDocument();
  });

  it('forwards its ref to the native select element', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Fruit">
        {fruitOptions}
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current).toBe(screen.getByRole('combobox', { name: 'Fruit' }));
  });

  it('is uncontrolled: a picked option is readable through the ref', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Fruit">
        {fruitOptions}
      </Select>,
    );
    await user.selectOptions(screen.getByRole('combobox', { name: 'Fruit' }), 'banana');
    expect(ref.current).toHaveValue('banana');
  });

  it('respects defaultValue as the initial selection', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Fruit" defaultValue="cherry">
        {fruitOptions}
      </Select>,
    );
    expect(ref.current).toHaveValue('cherry');
    expect(screen.getByRole('option', { name: 'Cherry', selected: true })).toBeInTheDocument();
  });

  it('fires onChange when an option is picked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Select aria-label="Fruit" onChange={onChange}>
        {fruitOptions}
      </Select>,
    );
    await user.selectOptions(screen.getByRole('combobox', { name: 'Fruit' }), 'apple');
    expect(onChange).toHaveBeenCalled();
  });

  it('submits its value through FormData under the given name', () => {
    render(
      <form aria-label="Order">
        <Select aria-label="Fruit" name="fruit" defaultValue="banana">
          {fruitOptions}
        </Select>
      </form>,
    );
    const form = screen.getByRole('form', { name: 'Order' });
    expect(new FormData(form as HTMLFormElement).get('fruit')).toBe('banana');
  });

  it('sets aria-invalid when invalid', () => {
    render(
      <Select invalid aria-label="Fruit">
        {fruitOptions}
      </Select>,
    );
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('omits aria-invalid when not invalid', () => {
    render(<Select aria-label="Fruit">{fruitOptions}</Select>);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).not.toHaveAttribute('aria-invalid');
  });

  it('renders as a listbox when multiple, and multi-selection reads through the ref', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Fruits" multiple>
        {fruitOptions}
      </Select>,
    );
    const listbox = screen.getByRole('listbox', { name: 'Fruits' });
    await user.selectOptions(listbox, ['apple', 'cherry']);
    const selected = Array.from(ref.current?.selectedOptions ?? []).map((o) => o.value);
    expect(selected).toEqual(['apple', 'cherry']);
  });

  it('maps htmlSize to the native visible-option-count size attribute', () => {
    render(
      <Select htmlSize={3} aria-label="Fruit">
        {fruitOptions}
      </Select>,
    );
    // A select with size > 1 has the listbox role, per the ARIA mapping.
    expect(screen.getByRole('listbox', { name: 'Fruit' })).toHaveAttribute('size', '3');
  });

  it('keeps options inside native optgroups selectable', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Fruit">
        <optgroup label="Citrus">
          <option value="lemon">Lemon</option>
          <option value="lime">Lime</option>
        </optgroup>
        <optgroup label="Stone fruit">
          <option value="peach">Peach</option>
        </optgroup>
      </Select>,
    );
    expect(screen.getByRole('group', { name: 'Citrus' })).toBeInTheDocument();
    await user.selectOptions(screen.getByRole('combobox', { name: 'Fruit' }), 'peach');
    expect(ref.current).toHaveValue('peach');
  });

  it('does not change the selection when disabled', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} disabled aria-label="Fruit" defaultValue="apple">
        {fruitOptions}
      </Select>,
    );
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeDisabled();
    await user.selectOptions(screen.getByRole('combobox', { name: 'Fruit' }), 'banana');
    expect(ref.current).toHaveValue('apple');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Select aria-label="Default">{fruitOptions}</Select>
        <Select aria-label="Small invalid" size="sm" invalid>
          {fruitOptions}
        </Select>
        <Select aria-label="Disabled" disabled>
          {fruitOptions}
        </Select>
        <Select aria-label="Multiple" multiple>
          {fruitOptions}
        </Select>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
