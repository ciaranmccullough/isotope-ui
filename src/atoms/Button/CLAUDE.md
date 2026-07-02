# Button — contract

Wraps: **`<button>`** (exactly one). Pain point removed: `type` defaults to `"button"`, not the
platform's `"submit"`.

## UI model (`ButtonProps` extends `ComponentPropsWithoutRef<'button'>`)

| Prop       | Values                                             | Default   |
| ---------- | -------------------------------------------------- | --------- |
| `tone`     | `neutral · accent · positive · critical · caution` | `neutral` |
| `emphasis` | `solid · subtle · outline · ghost`                 | `solid`   |
| `size`     | `sm · md · lg`                                     | `md`      |

No other styling props. Content is `children`. Ref forwards to the `<button>`.

## Tokens consumed

- Tone sets: `--iso-color-<tone>-solid-*` / `-subtle-*` / `-border` (via private `--_*` props —
  tone classes set them, emphasis classes consume them; new tones only need a new tone class).
- Size: `--iso-size-control-<size>`, `--iso-spacing-3/4/5` (padding), `--iso-font-size-sm/md/lg`.
- Shape/type: `--iso-radius-md`, `--iso-border-width-1`, `--iso-font-family-sans`,
  `--iso-font-weight-medium`, `--iso-line-height-tight`, `--iso-spacing-2` (gap).
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring`.
- Motion: `--iso-duration-fast`, `--iso-easing-standard` (disabled under
  `prefers-reduced-motion`).
- Disabled: `--iso-color-neutral-subtle-bg`, `--iso-color-text-disabled`.

## Accessibility

Native button semantics — no ARIA added. Focus via `:focus-visible` ring tokens. Disabled uses
the real `disabled` attribute (excluded from tab order, no fake `aria-disabled`).

## Stories / tests must cover

All 5×4 tone/emphasis combinations, 3 sizes, disabled; default-type behavior, explicit
`type="submit"`, ref forwarding, onClick + disabled-blocks-click, axe.
