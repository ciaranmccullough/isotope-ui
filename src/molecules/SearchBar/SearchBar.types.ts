import type { ComponentPropsWithoutRef, FormEventHandler } from 'react';

export type SearchBarSize = 'sm' | 'md' | 'lg';

export interface SearchBarProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'size' | 'checked' | 'children' | 'type' | 'onSubmit'
> {
  /** Control size — forwarded to the composed Input; icon and paddings track it. @default 'md' */
  size?: SearchBarSize;
  /** Accessible name for both the search landmark and the searchbox. @default 'Search' */
  label?: string;
  /**
   * Visual-only keyboard shortcut hint rendered as an `aria-hidden` `<kbd>` at the field's end
   * (sized for short hints like "⌘K" or "Ctrl K"). Registering the actual shortcut is the
   * consumer's behavior — a dumb component listens to nothing globally.
   */
  shortcutHint?: string;
  /** Maps to `aria-invalid` + the critical border on the composed Input. @default false */
  invalid?: boolean;
  /** Native char-width `size` attribute of the input, re-exposed because `size` is the variant prop. */
  htmlSize?: number;
  /**
   * Submit handler on the search `<form>` — Enter in the input submits natively. Read the query
   * via `new FormData(event.currentTarget)` (give the input a `name`); SPA consumers call
   * `event.preventDefault()`.
   */
  onSubmit?: FormEventHandler<HTMLFormElement>;
  /** Form `action` for zero-JS native GET search (pair with a `name` on the input). */
  action?: ComponentPropsWithoutRef<'form'>['action'];
}
