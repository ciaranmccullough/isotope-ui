import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface NavbarProps extends ComponentPropsWithoutRef<'nav'> {
  /** Brand slot (logo/name), rendered before the navigation children. */
  brand?: ReactNode;
  /** Actions slot (Buttons…), pushed to the end of the bar. */
  actions?: ReactNode;
  /** Stick to the top of the viewport (`--iso-z-sticky`). @default false */
  sticky?: boolean;
}
