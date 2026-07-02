import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface FooterProps extends ComponentPropsWithoutRef<'footer'> {
  /** Fine-print slot (copyright, legal links) rendered below the children columns. */
  legal?: ReactNode;
}
