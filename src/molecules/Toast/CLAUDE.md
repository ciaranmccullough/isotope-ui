# Toast — contract

A single notification unit. Composes **Text** (title/description) and **Button** (dismiss) around
a **`<div role="status">`** root; `icon` and `action` are consumer-supplied slots. The
queue/region — placement, stacking, timers, auto-dismiss, live-region strategy — is the future
**ToastRegion organism**; this unit owns none of that and keeps zero state.

## UI model (`ToastProps` extends `ComponentPropsWithoutRef<'div'>` minus `role`/`title`/`children`)

| Prop           | Values                                                           | Default   |
| -------------- | ---------------------------------------------------------------- | --------- |
| `tone`         | `neutral · accent · positive · critical · caution`               | `neutral` |
| `role`         | `status · alert` (tone of announcement)                          | `status`  |
| `title`        | string (required — names the region via `aria-labelledby`)       | —         |
| `description`  | string (wired via `aria-describedby`)                            | —         |
| `icon`         | `ReactNode` — consumer `Icon`, rendered in an `aria-hidden` slot | —         |
| `onDismiss`    | `() => void` — presence renders the dismiss button               | —         |
| `dismissLabel` | string (accessible name of the dismiss button)                   | `Dismiss` |
| `action`       | `ReactNode` — consumer `Button`; consumer owns onClick/state     | —         |

No other styling props; the consumer `style`/`className` pass through to the root and win. Ref
forwards to the root `<div>` (there is no always-present interactive element — dismiss is
conditional).

## Behavior (stateless by design)

- No timers, no auto-dismiss, no queueing — the consumer or ToastRegion owns the lifecycle;
  `onDismiss` only reports intent (dismiss renders a tone-matched ghost `sm` Button with a plain
  `×` glyph — no icon dependency).
- `useId` wires `aria-labelledby` (title) and `aria-describedby` (description) — id generation,
  not state.
- Title renders `Text` `size="sm" weight="semibold"` in the tone's subtle-fg; description renders
  `Text` `size="sm" tone="secondary"`.

## Tokens consumed

- Tone sets (via private `--_*` props): `--iso-color-<tone>-subtle-bg` (background),
  `--iso-color-<tone>-subtle-fg` (title/icon color), `--iso-color-<tone>-solid-bg` (accent edge).
  **Exception:** caution's edge uses `--iso-color-caution-graphic` — `caution-solid-bg` is too
  light for a thin graphic (documented exception in the tokens).
- Layout: `--iso-spacing-1/2/3/4` (gaps/padding), `--iso-radius-lg`, `--iso-border-width-2`
  (edge), `--iso-shadow-md`, `--iso-font-family-sans`, `--iso-font-size-lg` (× glyph).
- No motion tokens: the unit is static (entry/exit animation belongs to ToastRegion), so no
  `prefers-reduced-motion` guard applies. Focus rings come from the composed Buttons.

## Accessibility

- `role="status"` (polite) by default; `role="alert"` for assertive announcements. ToastRegion
  will own real live-region placement — the unit just carries a sensible default.
- Accessible name = `title` via `aria-labelledby`; accessible description = `description` via
  `aria-describedby` (omitted when there is no description).
- The `icon` slot is always `aria-hidden` — decorative; the title carries the meaning.
- Dismiss button is named by `dismissLabel` (localize via the prop). The root is not focusable.

## Stories / tests must cover

All 5 tones, with/without icon, with action, dismissible, `role="alert"`; default `status` role +
`alert` override, accessible title/description, `onDismiss` via user-event on the named button,
custom `dismissLabel`, action slot renders and stays consumer-owned, no dismiss button when
`onDismiss` is absent, icon slot hidden from AT, ref forwarding, className merge, axe per tone.

## Deviations noted for the integrator

- The edge uses `border-inline-start` (logical "left" — follows writing direction) rather than
  physical `border-left`.
- Native `title` (tooltip) and `children` are omitted from the div props: `title` is repurposed
  as the required headline; content is fully structured via props.
