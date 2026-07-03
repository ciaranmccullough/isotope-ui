# Checkbox — contract

Wraps: **`<input type="checkbox">`** inside its `<label>` (the label is layout/typography only;
the input is the one native control and the ref target). Pain points removed: no `id`/`htmlFor`
bookkeeping (implicit association by wrapping), and the control is tinted via `accent-color`
instead of being rebuilt — the platform keeps drawing the box, the check mark and the mixed dash.

This is the visible platform checkbox for selection (lists, bulk actions, consent). The Switch
atom also rides a hidden checkbox but restyles it as a settings toggle — do not conflate them.

## UI model (`CheckboxProps` extends `Omit<ComponentPropsWithoutRef<'input'>, 'checked' | 'type' | 'size'>`)

| Prop   | Values         | Default |
| ------ | -------------- | ------- |
| `size` | `sm · md · lg` | `md`    |

- Uncontrolled: `checked` is omitted from the type — use `defaultChecked`; read state via the
  ref (`ref.current.checked`) or `FormData` (the `value` appears under `name` only while
  checked — platform behavior).
- Mixed state: `indeterminate` is a DOM **property**, not an attribute — consumers set it
  through the ref (`ref.current.indeterminate = true`). It is deliberately not a prop: it is
  derived, consumer-owned state (usually "some children selected"), and a dumb component holds
  no state. The platform still draws the dash and reports `checked: mixed` to AT.
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
- No motion: nothing animates (the platform draws state changes), so no duration/easing tokens
  and no reduced-motion guard needed.

## Accessibility

Native checkbox semantics — no ARIA added. Accessible name comes from the wrapping label's
text. Keyboard (Space to toggle) is entirely platform behavior. Focus via `:focus-visible` ring
tokens on the input. Disabled uses the real `disabled` attribute. Indeterminate announces as
"mixed" because the platform maps the property for us.

## Stories / tests must cover

Stories: playground, all three sizes, `defaultChecked`, a same-`name` group, indeterminate (set
via callback ref — consumer-side), disabled (unchecked + checked), FormData read in a form.
Tests: role `checkbox` + accessible name, each size renders, ref forwards to `HTMLInputElement`
(type/value readable), `defaultChecked` read through ref, toggles on click (ref `.checked`
flips both ways), `onChange` fires, FormData contains `value` under `name` only while checked,
`indeterminate` set via ref reports partially-checked, disabled blocks toggling and `onChange`,
axe.
