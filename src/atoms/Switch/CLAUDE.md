# Switch — contract

Wraps: **`<input type="checkbox" role="switch">`** inside its wrapping **`<label>`** (one native
control; the label is the built-in association wrapper). Pain points removed: uncontrolled by
construction (`checked` is not a prop — use `defaultChecked`, read via ref/`FormData`), and no
`id`/`htmlFor` wiring — `children` renders inside the `<label>` after the control, so the text
both names the switch and toggles it on click.

## UI model (`SwitchProps` extends `Omit<ComponentPropsWithoutRef<'input'>, 'checked' | 'type' | 'size' | 'role'>`)

| Prop             | Values             | Default |
| ---------------- | ------------------ | ------- |
| `size`           | `sm · md`          | `md`    |
| `defaultChecked` | `boolean` (native) | `false` |
| `children`       | visible label text | —       |

No other styling props. `className` merges onto the root `<label>`; every other native input
prop (`name`, `disabled`, `onChange`, `aria-label`, …) spreads onto the `<input>`. Ref forwards
to the `<input>`.

## Tokens consumed

- Track: sm `--iso-spacing-8` × `--iso-spacing-4`, md `--iso-spacing-10` × `--iso-spacing-5`
  (size classes set private `--_track-width/height` props consumed by the input);
  `--iso-radius-full`; unchecked `--iso-color-border-strong`, checked
  `--iso-color-accent-solid-bg`.
- Thumb (`::before`): sm `--iso-spacing-3`, md `--iso-spacing-4` (`--_thumb-size`);
  `--iso-color-surface`, `--iso-radius-full`, `--iso-shadow-sm`. Inset and checked travel are
  `calc()` of the track/thumb tokens only.
- Label: `--iso-spacing-2` (gap), `--iso-font-family-sans`, `--iso-font-size-md`,
  `--iso-line-height-normal`, `--iso-color-text`.
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring` (`:focus-visible` on the
  input).
- Motion: `--iso-duration-fast`, `--iso-easing-standard` on track color + thumb transform
  (`transition: none` under `prefers-reduced-motion`).
- Disabled: `--iso-color-neutral-subtle-bg` (track), `--iso-color-text-disabled` (label text).

## Accessibility

A real checkbox with `role="switch"` — keyboard toggling (Space), form participation, and label
activation are all native; ARIA only fills the role gap. The accessible name comes from the
wrapped label text; **when used without `children`, consumers MUST pass `aria-label`.** Disabled
uses the real `disabled` attribute (excluded from tab order, no fake `aria-disabled`). Focus ring
via `:focus-visible` tokens on the input itself.

## Stories / tests must cover

Both sizes, unchecked + `defaultChecked`, disabled (off and on), aria-label-only usage;
accessible name from label text and from `aria-label`, ref forwarding to the native input,
uncontrolled `checked` reads through the ref across toggles, `defaultChecked` respected,
`onChange` fires, disabled blocks toggling, axe.
