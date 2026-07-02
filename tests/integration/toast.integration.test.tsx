import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from '../../src/atoms/Button';
import { Toast } from '../../src/molecules/Toast';
import { ToastRegion } from '../../src/organisms/ToastRegion';
import type { ToastTone } from '../../src/molecules/Toast';

/**
 * The queue lives in the CONSUMER (this component) — the library stays stateless. This suite
 * proves the documented pattern works end to end: push → stack → dismiss → empty region.
 */
interface Entry {
  id: number;
  tone: ToastTone;
  title: string;
}

function QueueApp() {
  const [queue, setQueue] = useState<Entry[]>([]);
  const [nextId, setNextId] = useState(1);

  const push = (tone: ToastTone, title: string) => {
    setQueue((q) => [...q, { id: nextId, tone, title }]);
    setNextId((n) => n + 1);
  };

  return (
    <>
      <Button onClick={() => push('positive', 'Saved')}>Push success</Button>
      <Button onClick={() => push('critical', 'Failed')}>Push error</Button>
      <ToastRegion>
        {queue.map((entry) => (
          <Toast
            key={entry.id}
            title={entry.title}
            tone={entry.tone}
            dismissLabel={`Dismiss ${entry.title}`}
            onDismiss={() => setQueue((q) => q.filter((e) => e.id !== entry.id))}
          />
        ))}
      </ToastRegion>
    </>
  );
}

describe('Toast queue integration', () => {
  it('stacks pushed toasts in order and removes them on dismiss', async () => {
    const user = userEvent.setup();
    render(<QueueApp />);
    const region = screen.getByRole('region', { name: 'Notifications' });

    expect(within(region).queryAllByRole('status')).toHaveLength(0);

    await user.click(screen.getByRole('button', { name: 'Push success' }));
    await user.click(screen.getByRole('button', { name: 'Push error' }));
    await user.click(screen.getByRole('button', { name: 'Push success' }));

    const toasts = within(region).getAllByRole('status');
    expect(toasts).toHaveLength(3);
    expect(toasts[0]).toHaveTextContent('Saved');
    expect(toasts[1]).toHaveTextContent('Failed');

    await user.click(within(region).getByRole('button', { name: 'Dismiss Failed' }));
    expect(within(region).getAllByRole('status')).toHaveLength(2);
    expect(within(region).queryByText('Failed')).not.toBeInTheDocument();

    // Two identical "Saved" toasts remain — dismiss them one at a time.
    await user.click(within(region).getAllByRole('button', { name: 'Dismiss Saved' })[0]!);
    await user.click(within(region).getAllByRole('button', { name: 'Dismiss Saved' })[0]!);
    expect(within(region).queryAllByRole('status')).toHaveLength(0);
  });

  it('has no axe violations with a populated queue', async () => {
    const user = userEvent.setup();
    const { container } = render(<QueueApp />);
    await user.click(screen.getByRole('button', { name: 'Push success' }));
    await user.click(screen.getByRole('button', { name: 'Push error' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
