import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { Dialog } from './Dialog';
import type { DialogSize } from './Dialog.types';

const meta = {
  title: 'Organisms/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Open settings</Button>
      <Dialog aria-labelledby="settings-title" ref={ref}>
        <Text as="h2" id="settings-title" size="lg" weight="semibold">
          Settings
        </Text>
        <Text tone="secondary">
          The platform traps focus, closes on Esc, and dims the page via ::backdrop.
        </Text>
        <Button onClick={() => ref.current?.close()}>Close</Button>
      </Dialog>
    </>
  );
}

export const Modal: Story = {
  render: () => <ModalDemo />,
};

function ConfirmFormDemo() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button tone="critical" onClick={() => ref.current?.showModal()}>
        Delete item
      </Button>
      <Dialog aria-labelledby="confirm-title" ref={ref} size="sm">
        <form method="dialog" style={{ display: 'grid', gap: 'var(--iso-spacing-4)' }}>
          <Text as="h2" id="confirm-title" size="lg" weight="semibold">
            Delete this item?
          </Text>
          <div style={{ display: 'flex', gap: 'var(--iso-spacing-2)' }}>
            <Button type="submit" value="cancel" emphasis="subtle">
              Cancel
            </Button>
            <Button type="submit" value="delete" tone="critical">
              Delete
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export const ConfirmForm: Story = {
  name: 'Form with method="dialog"',
  render: () => <ConfirmFormDemo />,
};

export const NonModal: Story = {
  render: () => (
    <Dialog aria-label="Tip" open>
      <Text>A non-modal dialog via the native open attribute — no backdrop, no focus trap.</Text>
    </Dialog>
  ),
};

function SizeDemo({ size }: { size: DialogSize }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <span>
      <Button onClick={() => ref.current?.showModal()}>Open {size}</Button>
      <Dialog aria-label={`${size} dialog`} ref={ref} size={size}>
        <Text>size=&quot;{size}&quot;</Text>
        <Button onClick={() => ref.current?.close()}>Close</Button>
      </Dialog>
    </span>
  );
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-2)' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <SizeDemo key={size} size={size} />
      ))}
    </div>
  ),
};
