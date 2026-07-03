import type { ComponentPropsWithoutRef } from 'react';
import type { Tone } from '../../tokens';

export type ChipTone = Tone;

export interface ChipProps extends ComponentPropsWithoutRef<'span'> {
  /** Semantic color intent — subtle background + matching foreground. @default 'neutral' */
  tone?: ChipTone;
  /** Renders a decorative leading status dot in the tone's foreground color. @default false */
  dot?: boolean;
  /**
   * Presence renders a tone-matched ghost remove button. The chip keeps no state — the
   * consumer removes it from their own data in response.
   */
  onRemove?: () => void;
  /**
   * Accessible name for the remove button. Name the chip in it (e.g. "Remove React") —
   * several chips usually sit side by side. @default 'Remove'
   */
  removeLabel?: string;
}
