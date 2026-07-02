# RadioButton — contract

Wraps: **`<input type="radio">`** inside its `<label>` (the label is layout/typography only; the
input is the one native control and the ref target). Pain points removed: no `id`/`htmlFor`
bookkeeping (implicit association by wrapping), and the control is tinted via `accent-color`
instead of being rebuilt — the platform keeps drawing the radio.

## UI model (`RadioButtonProps` extends `Omit<ComponentPropsWithoutRef<'input'>, 'checked' | 'type' | 'size'>`)

| Prop   | Values         | Default |
| ------ | -------------- | ------- |
| `size` | `sm · md · lg` | `md`    |

- Uncontrolled: `checked` is omitted from the type — use `defaultChecked`; read state via the
  ref (`ref.current.checked`) or `FormData`.
- `name` / `value` pass through to the input. Sharing a `name` gives native group behavior
  (mutual exclusion, arrow-key roving). The RadioGroup molecule owns grouping later.
- `children` is the label text (the accessible name). Ref forwards to the `<input>`.
- `className` merges onto the root `<label>`; all other props spread onto the `<input>`.

## Tokens consumed

- Accent: `--iso-color-accent-solid-bg` (via `accent-color` — no custom drawing).
- Size: `--iso-size-icon-sm` / `--iso-size-icon-md` / `--iso-size-icon-lg` (input
  width/height), `--iso-spacing-0` (margin reset).
- Label typography: `--iso-font-family-sans`, `--iso-font-size-md`,
  `--iso-font-weight-regular`, `--iso-line-height-normal`, `--iso-color-text`,
  `--iso-spacing-2` (gap); `--iso-spacing-6` min-inline/block-size keeps the pointer target
  ≥ 24px when label-less (WCAG 2.5.8), with `align-items: center` keeping the control centered.
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring` (on the input's
  `:focus-visible`).
- Disabled: `--iso-color-text-disabled` + `not-allowed` cursor, applied with
  `:has(input:disabled)` so a disabling `<fieldset>` ancestor styles it too.
- No motion: nothing animates, so no duration/easing tokens and no reduced-motion guard needed.

## Accessibility

Native radio semantics — no ARIA added. Accessible name comes from the wrapping label's text.
Keyboard (Space to select, arrow keys within a same-`name` group) is entirely platform behavior.
Focus via `:focus-visible` ring tokens on the input. Disabled uses the real `disabled` attribute.

## Stories / tests must cover

Stories: playground, all three sizes, `defaultChecked`, a shared-`name` group, disabled
(unchecked + checked). Tests: role `radio` + accessible name, each size renders, ref forwards to
`HTMLInputElement` (type/value readable), `defaultChecked` read through ref, two RadioButtons
sharing a `name` are mutually exclusive under user-event (ref `.checked` flips), `onChange`
fires, disabled blocks selection and `onChange`, axe.
