import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastRegion } from './ToastRegion';
import { Toast } from '../../molecules/Toast';
import { Button } from '../../atoms/Button';
import type { ToastTone } from '../../molecules/Toast';

const meta = {
  title: 'Organisms/ToastRegion',
  component: ToastRegion,
} satisfies Meta<typeof ToastRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

interface QueueEntry {
  id: number;
  tone: ToastTone;
  title: string;
}

/** The queue lives in the consumer (this demo), never in the library. */
function QueueDemo() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [nextId, setNextId] = useState(1);

  const push = (tone: ToastTone, title: string) => {
    setQueue((q) => [...q, { id: nextId, tone, title }]);
    setNextId((n) => n + 1);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 'var(--iso-spacing-2)' }}>
        <Button size="sm" tone="positive" onClick={() => push('positive', 'Saved')}>
          Push success
        </Button>
        <Button size="sm" tone="critical" onClick={() => push('critical', 'Sync failed')}>
          Push error
        </Button>
      </div>
      <ToastRegion>
        {queue.map((entry) => (
          <Toast
            key={entry.id}
            title={entry.title}
            tone={entry.tone}
            onDismiss={() => setQueue((q) => q.filter((e) => e.id !== entry.id))}
          />
        ))}
      </ToastRegion>
    </>
  );
}

export const ConsumerQueue: Story = {
  render: () => <QueueDemo />,
};

export const Placements: Story = {
  render: () => (
    <>
      <ToastRegion placement="top-start" label="Top start">
        <Toast title="top-start" />
      </ToastRegion>
      <ToastRegion placement="top-end" label="Top end">
        <Toast title="top-end" tone="accent" />
      </ToastRegion>
      <ToastRegion placement="bottom-start" label="Bottom start">
        <Toast title="bottom-start" tone="positive" />
      </ToastRegion>
      <ToastRegion placement="bottom-end" label="Bottom end">
        <Toast title="bottom-end" tone="caution" />
      </ToastRegion>
    </>
  ),
};
