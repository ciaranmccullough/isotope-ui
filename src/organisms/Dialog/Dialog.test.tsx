import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Dialog } from './Dialog';
import type { DialogSize } from './Dialog.types';

const sizes: DialogSize[] = ['sm', 'md', 'lg'];

describe('Dialog', () => {
  it('is closed (no dialog role exposed) until opened', () => {
    render(<Dialog aria-label="Settings">content</Dialog>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modally through the forwarded ref and exposes its accessible name', () => {
    const ref = createRef<HTMLDialogElement>();
    render(
      <Dialog aria-label="Settings" ref={ref}>
        content
      </Dialog>,
    );
    ref.current?.showModal();
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeVisible();
  });

  it('closes through the ref and reports onClose', () => {
    const onClose = jest.fn();
    const ref = createRef<HTMLDialogElement>();
    render(
      <Dialog aria-label="Settings" onClose={onClose} ref={ref}>
        content
      </Dialog>,
    );
    ref.current?.showModal();
    ref.current?.close();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // form[method="dialog"] submission is not implemented in jsdom — that path is demonstrated
  // in the ConfirmForm story; here we cover the close(returnValue) API it rides on.
  it('captures a returnValue passed to close()', () => {
    const ref = createRef<HTMLDialogElement>();
    render(
      <Dialog aria-label="Confirm" ref={ref}>
        content
      </Dialog>,
    );
    ref.current?.showModal();
    ref.current?.close('confirmed');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(ref.current?.returnValue).toBe('confirmed');
  });

  it('supports declarative non-modal usage via the native open prop', () => {
    render(
      <Dialog aria-label="Hint" open>
        content
      </Dialog>,
    );
    expect(screen.getByRole('dialog', { name: 'Hint' })).toBeVisible();
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(
      <Dialog aria-label={`${size} dialog`} open size={size}>
        content
      </Dialog>,
    );
    expect(screen.getByRole('dialog', { name: `${size} dialog` })).toBeVisible();
  });

  it('forwards its ref to the native dialog element', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<Dialog aria-label="Settings" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDialogElement);
  });

  it('has no axe violations while open', async () => {
    const { container } = render(
      <Dialog aria-label="Settings" open>
        <p>content</p>
      </Dialog>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
