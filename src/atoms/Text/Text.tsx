import { forwardRef } from 'react';
import type { ElementType } from 'react';
import type { TextProps } from './Text.types';
import styles from './Text.module.css';

/**
 * Polymorphic text primitive. Pain point removed: the semantic element (`as`) is decoupled
 * from the visual scale (`size`), so document structure never dictates appearance — an `h2`
 * can render small and a `p` can render at display scale. Margins are zeroed; consumers own
 * spacing.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as = 'p',
    size = 'md',
    weight = 'regular',
    tone = 'default',
    align,
    truncate = false,
    className,
    ...rest
  },
  ref,
) {
  const Tag: ElementType = as;
  const classes = [
    styles.text,
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    styles[`tone-${tone}`],
    align ? styles[`align-${align}`] : undefined,
    truncate ? styles.truncate : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // The forwarded ref receives whichever TextElement renders — always an HTMLElement — but
  // TS cannot prove Ref<HTMLElement> against the intersection of every union member's ref
  // type, so it is narrowed with a cast here (standard for polymorphic intrinsic elements).
  return <Tag ref={ref as never} className={classes} {...rest} />;
});
