import type { ComponentPropsWithoutRef } from 'react';

export type ToastRegionPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface ToastRegionProps extends ComponentPropsWithoutRef<'section'> {
  /** Viewport corner the stack pins to. @default 'bottom-end' */
  placement?: ToastRegionPlacement;
  /** Accessible name of the region landmark. @default 'Notifications' */
  label?: string;
}
