import { forwardRef } from 'react';
import type { DialogProps } from './Dialog.types';
import styles from './Dialog.module.css';

/**
 * Native `<dialog>`. The platform provides modality, focus trapping, Esc-to-cancel, the top
 * layer, and `::backdrop` — none of it is re-implemented here. Dumb: open state is driven by
 * the consumer through the forwarded ref (`showModal()` / `close()`) or the native `open`
 * attribute for non-modal usage. Label it via `aria-label` or `aria-labelledby`.
 */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  { size = 'md', className, ...rest },
  ref,
) {
  const classes = [styles.dialog, styles[`size-${size}`], className].filter(Boolean).join(' ');

  return <dialog ref={ref} className={classes} {...rest} />;
});
