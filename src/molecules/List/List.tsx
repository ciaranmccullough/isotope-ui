import { forwardRef } from 'react';
import type { ListProps } from './List.types';
import styles from './List.module.css';

/**
 * Flex-token `<ul>`/`<ol>` wrapper for menus, tag rows, and stacks. Children are
 * consumer-provided ListItem atoms or native `<li>` elements — List styles the list box only
 * and never imports, clones, or inspects its items. Pain points removed: the browser's default
 * list margin/indent/markers for app-UI lists (`marker="none"`, the default), and the
 * Safari/VoiceOver quirk where `list-style: none` drops list semantics (an explicit
 * `role="list"` is applied in that case — ARIA filling a genuine platform gap).
 */
export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(function List(
  {
    as = 'ul',
    direction = 'vertical',
    gap = '2',
    wrap = false,
    marker = 'none',
    start,
    reversed,
    className,
    ...rest
  },
  ref,
) {
  const classes = [
    styles.list,
    styles[`direction-${direction}`],
    styles[`gap-${gap}`],
    wrap ? styles.wrap : null,
    styles[`marker-${marker}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // One callback ref serves both elements; it stores nothing — it only relays the DOM node
  // to the consumer's forwarded ref.
  const setRef = (node: HTMLUListElement | HTMLOListElement | null): void => {
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  // Safari/VoiceOver drop list semantics once `list-style: none` applies; restore them
  // explicitly. Spread before {...rest} so an explicit consumer `role` always wins.
  const listRole = marker === 'none' ? { role: 'list' } : undefined;

  return as === 'ol' ? (
    <ol
      ref={setRef}
      className={classes}
      start={start}
      reversed={reversed}
      {...listRole}
      {...rest}
    />
  ) : (
    <ul ref={setRef} className={classes} {...listRole} {...rest} />
  );
});
