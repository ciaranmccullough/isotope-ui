import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Tone } from '../../tokens';

export type ToastTone = Tone;
export type ToastRole = 'status' | 'alert';

export interface ToastProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'role' | 'title' | 'children'
> {
  /** Semantic color intent — drives the accent edge, background and title color. @default 'neutral' */
  tone?: ToastTone;
  /**
   * Tone of the announcement: `'status'` (polite) or `'alert'` (assertive). The future
   * ToastRegion organism owns live-region placement; the unit still carries a sensible default.
   * @default 'status'
   */
  role?: ToastRole;
  /** Toast headline. Required — it names the live region via `aria-labelledby`. */
  title: string;
  /** Supporting copy, wired to the root via `aria-describedby`. */
  description?: string;
  /** Consumer-supplied `Icon`, rendered inside an `aria-hidden` slot (always decorative). */
  icon?: ReactNode;
  /**
   * Presence renders a tone-matched ghost dismiss button. The unit keeps no state and runs no
   * timers — the consumer (or the ToastRegion organism) removes the toast in response.
   */
  onDismiss?: () => void;
  /** Accessible name for the dismiss button. @default 'Dismiss' */
  dismissLabel?: string;
  /** Slot for a consumer-owned action `Button` — the consumer owns its `onClick`/state. */
  action?: ReactNode;
}
