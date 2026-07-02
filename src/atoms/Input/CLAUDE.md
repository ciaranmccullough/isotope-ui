# Input — contract

Wraps: **`<input>`** (exactly one). Pain points removed: uncontrolled by construction (`value` is
omitted from the props so it cannot become controlled — use `defaultValue`; read the current value
through the forwarded ref or `FormData`), and `invalid` sets `aria-invalid` + the critical border
in one prop. Works for text-like types: `text` (default) · `email` · `number` · `password` ·
`search` · `url` · `tel`.

## UI model (`InputProps` extends `Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'size'>`)

| Prop       | Values           | Default |
| ---------- | ---------------- | ------- |
| `size`     | `sm · md · lg`   | `md`    |
| `invalid`  | `boolean`        | `false` |
| `htmlSize` | `number` (chars) | —       |

- `value` omitted: enforces uncontrolled usage (principle 2). Use `defaultValue`.
- Native char-width `size` attribute is re-exposed as `htmlSize` because `size` is the variant
  prop.
- No other styling props. Ref forwards to the `<input>`.

## Tokens consumed

- Size: `--iso-size-control-<size>` (height), `--iso-spacing-3/4/5` (padding-inline),
  `--iso-font-size-sm/md/lg`.
- Surface/shape/type: `--iso-color-surface`, `--iso-border-width-1`,
  `--iso-color-border-strong`, `--iso-radius-md`, `--iso-color-text`, `--iso-font-family-sans`,
  `--iso-font-weight-regular`, `--iso-line-height-tight`.
- Placeholder: `--iso-color-text-muted`.
- Invalid: `--iso-color-critical-border` (border only; ring stays focus-colored).
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring`.
- Motion: `--iso-duration-fast`, `--iso-easing-standard` (disabled under
  `prefers-reduced-motion`).
- Disabled: `--iso-color-surface-sunken`, `--iso-color-text-disabled`.

## Accessibility

Native input semantics. The component renders no label — consumers must associate one (`<label>`,
`aria-label`, or `aria-labelledby`); FormField handles this at the molecule tier. `invalid` maps
to `aria-invalid="true"` (attribute omitted otherwise, and a consumer-passed `aria-invalid` can
still override). Disabled uses the real `disabled` attribute. Focus via `:focus-visible` ring
tokens.

## Stories / tests must cover

Stories: playground, 3 sizes, invalid (all sizes), disabled (empty + filled), `defaultValue`,
seven input types, `htmlSize` char widths. Tests: accessible name via role, each size renders,
search/number role mapping, ref forwarding, uncontrolled typed value read through the ref,
`onChange` firing, `aria-invalid` set when `invalid` / absent otherwise, `htmlSize` → native
`size` attribute, disabled blocks typing, axe.
