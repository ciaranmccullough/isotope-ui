# Select — contract

Wraps: **`<select>`** (exactly one). **Platform-native**: the UA's dropdown arrow and popup are
kept — no `appearance: none`, no custom chevron, no re-implemented option list. Pain points
removed: uncontrolled by construction (`value` is not a prop — use `defaultValue`; read the
current selection through the forwarded ref or `FormData`), and `invalid` sets `aria-invalid` +
the critical border in one prop.

## UI model (`SelectProps` extends `Omit<ComponentPropsWithoutRef<'select'>, 'value' | 'size'>`)

| Prop       | Values                     | Default |
| ---------- | -------------------------- | ------- |
| `size`     | `sm · md · lg`             | `md`    |
| `invalid`  | `boolean`                  | `false` |
| `htmlSize` | `number` (visible options) | —       |

- `value` omitted: enforces uncontrolled usage (principle 2). Use `defaultValue` (a string, or a
  string array with `multiple`).
- Native option-count `size` attribute is re-exposed as `htmlSize` because `size` is the variant
  prop.
- `children` are native `<option>`/`<optgroup>` elements — options are never re-implemented.
- `multiple` passes through; with `multiple` (or any `htmlSize`) the fixed control height is
  released (`height: auto`) so the listbox height behaves natively.
- No other styling props. Ref forwards to the `<select>`.

## Tokens consumed

- Size: `--iso-size-control-<size>` (height, closed dropdown only), `--iso-spacing-3/4/5`
  (padding-inline), `--iso-font-size-sm/md/lg`.
- Surface/shape/type: `--iso-color-surface`, `--iso-border-width-1`,
  `--iso-color-border-control` (control boundary — meets WCAG 1.4.11 non-text contrast),
  `--iso-radius-md`, `--iso-color-text`, `--iso-font-family-sans`,
  `--iso-font-weight-regular`, `--iso-line-height-tight`.
- Invalid: `--iso-color-critical-solid-bg` as border-color **plus** an inset
  `--iso-border-width-1` box-shadow ring (mirrors Input's `.invalid`), so the boundary reads as
  2px without layout shift — perceivable beyond a hue shift. The focus ring stays focus-colored.
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring`.
- Motion: `--iso-duration-fast`, `--iso-easing-standard` (disabled under
  `prefers-reduced-motion`).
- Disabled: `--iso-color-surface-sunken`, `--iso-color-text-disabled`, `cursor: not-allowed`.

## Accessibility

Native select semantics — `combobox` role closed, `listbox` role with `multiple` or `size > 1`;
no ARIA added beyond `invalid` → `aria-invalid="true"` (attribute omitted otherwise, and a
consumer-passed `aria-invalid` can still override). The component renders no label — consumers
must associate one (`<label>`, `aria-label`, or `aria-labelledby`); FormField handles this at the
molecule tier. Disabled uses the real `disabled` attribute. Focus via `:focus-visible` ring
tokens. Keyboard behavior (typeahead, arrow keys, popup) is entirely the platform's.

## Stories / tests must cover

Stories: playground, 3 sizes, invalid (all sizes), disabled (empty + preselected),
`defaultValue`, optgroups, `multiple` with array `defaultValue`, `htmlSize` option counts.
Tests: combobox role + accessible name, each size renders, ref forwarding,
uncontrolled `selectOptions` value read through the ref, `defaultValue` respected + selected
option, `onChange` firing, FormData submission under `name`, `aria-invalid` set when `invalid` /
absent otherwise, listbox role + multi-selection when `multiple`, `htmlSize` → native `size`
attribute, optgroup children stay selectable, disabled blocks selection, axe.
