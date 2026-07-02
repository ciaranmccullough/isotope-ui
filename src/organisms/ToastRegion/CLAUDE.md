# ToastRegion — contract

Wraps: **`<section>`** (a labelled region landmark), fixed to a viewport corner, stacking
`Toast` molecules.

**Why there is no ToastProvider:** the spec names "ToastProvider / ToastRegion", but a provider
holding a queue would own state — forbidden by principle 1. The queue is an array in the
consumer's state; they render `<ToastRegion>{queue.map(…)}</ToastRegion>` and remove entries in
each Toast's `onDismiss`. The ConsumerQueue story is the reference implementation.

## UI model (`ToastRegionProps` extends `ComponentPropsWithoutRef<'section'>`)

| Prop        | Values                                            | Default         |
| ----------- | ------------------------------------------------- | --------------- |
| `placement` | `top-start · top-end · bottom-start · bottom-end` | `bottom-end`    |
| `label`     | string (the region's accessible name)             | `Notifications` |

## Tokens consumed

`--iso-z-toast`, `--iso-spacing-2/3/4/8` (offsets/gap/entry-shift/gutter),
`--iso-size-container-xs` (stack width), `--iso-duration-base` + `--iso-easing-enter`
(child entry animation, disabled under `prefers-reduced-motion`).

## Accessibility

Deliberately **no `aria-live` on the region**: each Toast is its own live region
(`role="status"` / `role="alert"`), so adding container liveness would risk double
announcements. The region is a labelled landmark so SR users can jump to the stack. The empty
region is `pointer-events: none`; toasts restore interactivity.

## Stories / tests must cover

Default + custom label, Toast stacking (status/alert roles within the region), consumer queue
re-render add/remove, all placements, ref (SECTION), axe with stacked toasts. Integration:
tests/integration/toast.integration.test.tsx runs the full consumer-queue flow.
