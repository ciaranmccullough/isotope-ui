import { forwardRef } from 'react';
import { Icon } from '../../atoms/Icon';
import { Input } from '../../atoms/Input';
import type { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.css';

/**
 * A search landmark: `<form role="search">` composing the Input atom (`type="search"`) with a
 * decorative magnifier `Icon` and an optional `aria-hidden` `<kbd>` shortcut hint overlaid on
 * it. The Input keeps all of its own chrome — border, focus ring, sizes, invalid, disabled;
 * this molecule only positions the overlays and widens the paddings under them.
 *
 * Platform-first: Enter submits the form natively (wire `onSubmit`, or `action` + a `name` for
 * zero-JS GET search); `type="search"` brings the UA clear affordance and the right mobile
 * keyboard. Uncontrolled as always — read the query via the forwarded ref (the `<input>`) or
 * `FormData` on submit.
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  {
    size = 'md',
    label = 'Search',
    shortcutHint,
    invalid = false,
    htmlSize,
    onSubmit,
    action,
    className,
    style,
    ...rest
  },
  ref,
) {
  const classes = [
    styles['search-bar'],
    styles[`size-${size}`],
    shortcutHint && styles['has-hint'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <form
      action={action}
      aria-label={label}
      className={classes}
      onSubmit={onSubmit}
      role="search"
      style={style}
    >
      <Icon className={styles.icon} size={size}>
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="m16 16 5 5"
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Icon>
      <Input
        aria-label={label}
        className={styles.input}
        htmlSize={htmlSize}
        invalid={invalid}
        ref={ref}
        size={size}
        type="search"
        {...rest}
      />
      {shortcutHint ? (
        <span aria-hidden="true" className={styles['hint-slot']}>
          <kbd className={styles.hint}>{shortcutHint}</kbd>
        </span>
      ) : null}
    </form>
  );
});
