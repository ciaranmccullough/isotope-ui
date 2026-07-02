import { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from '../../src/atoms/Button';
import { Input } from '../../src/atoms/Input';
import { FormField } from '../../src/molecules/FormField';
import { Dialog } from '../../src/organisms/Dialog';

/**
 * Composed Dialog flow: a consumer trigger opens the native <dialog> via ref, a form inside is
 * filled uncontrolled, and close() hands the value back through onClose + refs. Focus-trap,
 * Esc, and ::backdrop are platform behavior (not simulable in jsdom — covered by stories in a
 * real browser); this suite proves the composition seam: trigger → ref → dialog → form → close.
 */
function RenameFlow({ onSubmitted }: { onSubmitted: (value: string) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={() => dialogRef.current?.showModal()}>Rename</Button>
      <Dialog aria-labelledby="rename-title" ref={dialogRef}>
        <h2 id="rename-title">Rename item</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmitted(String(new FormData(event.currentTarget).get('name')));
            dialogRef.current?.close();
          }}
        >
          <FormField label="New name">
            <Input defaultValue="untitled" name="name" ref={inputRef} />
          </FormField>
          <Button type="submit">Save</Button>
        </form>
      </Dialog>
    </>
  );
}

describe('Dialog integration', () => {
  it('opens from a trigger, submits an uncontrolled form, and closes with the value', async () => {
    const user = userEvent.setup();
    const onSubmitted = jest.fn();
    render(<RenameFlow onSubmitted={onSubmitted} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Rename' }));
    expect(screen.getByRole('dialog', { name: 'Rename item' })).toBeVisible();

    const input = screen.getByRole('textbox', { name: 'New name' });
    await user.clear(input);
    await user.type(input, 'isotope notes');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSubmitted).toHaveBeenCalledWith('isotope notes');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no axe violations while the composed dialog is open', async () => {
    const user = userEvent.setup();
    const { container } = render(<RenameFlow onSubmitted={jest.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Rename' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
