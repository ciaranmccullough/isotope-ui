# Progress — contract

Wraps: **`<progress>`** (exactly one). Pain points removed: `max` defaults to `100` (the
platform default of `1` silently clamps percentage-style values), and the indeterminate state
gets a visible looping sheen (with `appearance: none`, engines otherwise render indeterminate
as an empty track, indistinguishable from 0%).

## UI model (`ProgressProps` extends `Omit<ComponentPropsWithoutRef<'progress'>, 'children'>`)

| Prop    | Values                                             | Default  |
| ------- | -------------------------------------------------- | -------- |
| `value` | `number` (0…`max`)                                 | absent   |
| `max`   | `number`                                           | `100`    |
| `tone`  | `neutral · accent · positive · critical · caution` | `accent` |
| `size`  | `sm · md`                                          | `md`     |

**`value` absent = native indeterminate state** ("busy, completion unknown") — the prop is not
defaulted, and passing `undefined` keeps the element indeterminate. No `children` (the fallback
content slot is stripped — it only renders in engines without `<progress>` support and would
invite misuse as a label). Not a user-editable form control, so the uncontrolled/`defaultValue`
rule does not apply; `value` is display data from the UI model. Ref forwards to the
`<progress>`; read `ref.current.value` / `.position` (`-1` when indeterminate).

## Tokens consumed

- Bar color: `--iso-color-<tone>-solid-bg` (via private `--_bar` — tone classes set it; the
  `::-webkit-progress-value`, `::-moz-progress-bar`, and indeterminate-sheen rules consume it).
- Track: `--iso-color-neutral-subtle-bg` (element background for Firefox + indeterminate canvas,
  `::-webkit-progress-bar` for WebKit/Blink).
- Size: `--iso-spacing-1` (sm height), `--iso-spacing-2` (md height).
- Shape: `--iso-radius-full` (element, track, and bar).
- Motion: `--iso-duration-base` + `--iso-easing-standard` (value-change transition),
  `--iso-duration-loop` + `--iso-easing-linear` (indeterminate sheen). Both disabled under
  `prefers-reduced-motion` (the sheen falls back to a static full-width gradient).

`appearance: none` + `border: none` remove UA chrome (not visual values). Gradient/position
percentages in the indeterminate rules are geometry, not design values. All three engines'
progress internals are styled: `::-webkit-progress-bar` (track), `::-webkit-progress-value`
(bar), `::-moz-progress-bar` (bar).

## Accessibility

Native `progressbar` role; `value`/`max` map to `aria-valuenow`/`aria-valuemax` implicitly — no
ARIA added. **`<progress>` has no accessible name of its own: consumers must label it** via
`aria-label` (all stories do) or an associated label (FormField). Not focusable, so no focus
ring. Indeterminate is conveyed natively to assistive tech (no `aria-valuenow`).

## Stories / tests must cover

All 5 tones, both sizes, indeterminate, value states (0 / partial / 100 / custom max);
role+accessible name, value/max reflection (incl. `position`), max default 100, indeterminate
render (`position === -1`), every tone×size, ref forwarding + value read through ref, native
prop spread (onClick via user-event), axe.
