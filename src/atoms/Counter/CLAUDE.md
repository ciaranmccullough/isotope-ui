# Counter — contract

The atoms tier's **single sanctioned composition** (fixed by the library spec — do not use as
precedent): `Button` − / `Input type="number"` / `Button` +. Core element for value purposes is
the **`<input type="number">`**; the ref forwards to it.

## UI model (`CounterProps` extends the Input's native props minus `value`/`size`/`type`)

| Prop             | Values                                                 | Default    |
| ---------------- | ------------------------------------------------------ | ---------- |
| `size`           | `sm · md · lg` (applied to both Buttons and the Input) | `md`       |
| `decrementLabel` | string (accessible name of the − button)               | `Decrease` |
| `incrementLabel` | string (accessible name of the + button)               | `Increase` |

`defaultValue`, `min`, `max`, `step`, `name`, `disabled`, `aria-label`… pass through to the
input. No `value` prop — uncontrolled only.

## Behavior (platform-first)

- Step buttons call the native `stepUp()`/`stepDown()` — min/max/step clamping is the browser's
  algorithm, not re-implemented.
- The native methods fire no events, so the Counter dispatches bubbling `input` + `change`
  events after stepping; consumer `onChange` fires normally.
- The internal `useRef` holds only the DOM node (needed for the native calls) — no UI state.
- Native number-input spinners are hidden in CSS (the Buttons replace them, not duplicate them).

## Tokens consumed

`--iso-spacing-1` (gap), `--iso-spacing-20` (input width); everything else comes from the
composed Button and Input (their tokens, focus rings, disabled states).

## Accessibility

The input needs an accessible name from the consumer (`aria-label` here, or FormField later).
Step buttons carry `aria-label`s (`decrementLabel`/`incrementLabel` — localize via props).
`disabled` disables all three controls together.

## Stories / tests must cover

Sizes, min/max/step clamping, disabled, FormData submission under `name`, custom button labels,
ref value reads, onChange on step, axe.
