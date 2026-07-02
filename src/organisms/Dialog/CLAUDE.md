# Dialog — contract

Wraps: **`<dialog>`** (exactly one). The platform supplies modality, focus trapping,
Esc-to-cancel, the top layer, and `::backdrop` — none re-implemented. Dumb: no open state is
stored; the consumer drives it via the forwarded ref (`showModal()` / `close()`) or the native
`open` attribute (non-modal).

## UI model (`DialogProps` extends `ComponentPropsWithoutRef<'dialog'>`)

| Prop   | Values         | Default |
| ------ | -------------- | ------- |
| `size` | `sm · md · lg` | `md`    |

Content is `children` (compose Text/Button/forms). Native `onClose`/`onCancel`/`open` pass
through. `form[method="dialog"]` closes it and sets `returnValue` — the platform way to confirm.

## Tokens consumed

`--iso-spacing-6` (padding), `--iso-spacing-8` (viewport gutter), `--iso-radius-lg`,
`--iso-shadow-overlay`, `--iso-color-surface/text/backdrop`, `--iso-font-family-sans`,
`--iso-size-container-xs/-sm/-md` (size variants via private `--_max-inline`),
`--iso-duration-base` + `--iso-easing-enter/linear` (open animations, disabled under
`prefers-reduced-motion`). No z-index — the top layer handles stacking.

## Accessibility

Consumers MUST label it: `aria-label` or `aria-labelledby` pointing at the title. Focus and
keyboard behavior are native. Non-modal `open` usage gets no focus trap — by design.

## Stories / tests must cover

Closed-by-default, ref `showModal()`/`close()` + `onClose`, `close(returnValue)`, non-modal
`open`, all sizes, ref instance, axe while open. jsdom caveats: dialog methods come from the
shim in tests/setup.ts, and `form[method="dialog"]` submission is not implemented in jsdom —
that flow is demonstrated by the ConfirmForm story and must be exercised in a real browser.
Integration test (tests/integration/dialog.integration.test.tsx) covers the composed
open→interact→close flow.
