import type { ComponentPropsWithoutRef } from 'react';

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps extends ComponentPropsWithoutRef<'dialog'> {
  /**
   * Maximum width: `sm`/`md`/`lg` → `--iso-size-container-xs/-sm/-md`. @default 'md'
   */
  size?: DialogSize;
}
