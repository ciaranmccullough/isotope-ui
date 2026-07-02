import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Toast } from './Toast';
import type { ToastTone } from './Toast.types';

const tones: ToastTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];

describe('Toast', () => {
  it('renders a status live region named by its title by default', () => {
    render(<Toast title="Changes saved" />);
    expect(screen.getByRole('status', { name: 'Changes saved' })).toBeInTheDocument();
  });

  it('renders as an alert when role="alert" is passed', () => {
    render(<Toast role="alert" title="Connection lost" />);
    expect(screen.getByRole('alert', { name: 'Connection lost' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('exposes the description as the accessible description', () => {
    render(<Toast title="Changes saved" description="Your profile is up to date." />);
    expect(screen.getByRole('status', { name: 'Changes saved' })).toHaveAccessibleDescription(
      'Your profile is up to date.',
    );
  });

  it('has no accessible description when none is provided', () => {
    render(<Toast title="Changes saved" />);
    expect(screen.getByRole('status')).not.toHaveAccessibleDescription();
  });

  it.each(tones)('renders the %s tone', (tone) => {
    render(<Toast tone={tone} title={`A ${tone} toast`} />);
    expect(screen.getByRole('status', { name: `A ${tone} toast` })).toBeInTheDocument();
  });

  it('renders no dismiss button when onDismiss is absent', () => {
    render(<Toast title="Changes saved" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('fires onDismiss when the dismiss button is activated', async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    render(<Toast title="Changes saved" onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('names the dismiss button from dismissLabel', () => {
    render(<Toast title="Gespeichert" onDismiss={() => undefined} dismissLabel="Schließen" />);
    expect(screen.getByRole('button', { name: 'Schließen' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('renders the action slot and leaves its behavior to the consumer', async () => {
    const user = userEvent.setup();
    const onUndo = jest.fn();
    render(
      <Toast
        title="Message archived"
        action={
          <Button emphasis="outline" onClick={onUndo} size="sm">
            Undo
          </Button>
        }
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onUndo).toHaveBeenCalledTimes(1);
  });

  it('hides the icon slot from assistive technology', () => {
    render(
      <Toast
        title="Changes saved"
        icon={
          <Icon label="Success">
            <circle cx="12" cy="12" r="8" />
          </Icon>
        }
      />,
    );
    // Even a labelled Icon is silenced by the slot's aria-hidden wrapper.
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('forwards its ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Toast ref={ref} title="Changes saved" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'status');
  });

  it('merges a consumer className onto the root', () => {
    render(<Toast title="Changes saved" className="consumer-class" />);
    expect(screen.getByRole('status')).toHaveClass('consumer-class');
  });

  it.each(tones)('has no axe violations fully loaded in the %s tone', async (tone) => {
    const { container } = render(
      <Toast
        tone={tone}
        title={`A ${tone} toast`}
        description="Something happened."
        icon={
          <Icon>
            <circle cx="12" cy="12" r="8" />
          </Icon>
        }
        onDismiss={() => undefined}
        action={
          <Button emphasis="outline" size="sm" tone={tone}>
            Undo
          </Button>
        }
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
