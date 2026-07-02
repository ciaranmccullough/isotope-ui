# RadioGroup — contract

Composes: **`<fieldset>`** (exactly one native grouping element; the ref target) + `<legend>` +
`RadioButton` atoms as children. Pain points removed: shared radio `name` bookkeeping (injected
into every direct `RadioButton` child) and group labeling/error wiring (`<legend>` gives the
accessible name; `error` is announced via `aria-describedby` on the fieldset).

## UI model (`RadioGroupProps` extends `Omit<ComponentPropsWithoutRef<'fieldset'>, 'children'>`)

| Prop        | Values                                          | Default                      |
| ----------- | ----------------------------------------------- | ---------------------------- |
| `legend`    | string (required — the group's accessible name) | —                            |
| `name`      | string (required — shared radio `name`)         | —                            |
| `direction` | `vertical · horizontal`                         | `vertical`                   |
| `error`     | string (error text below the options)           | —                            |
| `size`      | `sm · md · lg` (`RadioButtonSize`, passed down) | — (children default to `md`) |

- `children` are `RadioButton` atoms. `React.Children.map` + `cloneElement` inject `name` (and
  `size` when set) into each **direct** `RadioButton` child; a child's **own explicit
  `name`/`size` wins**. Non-element children pass through untouched; elements wrapped in
  fragments or other containers are **not** traversed — pass `RadioButton`s as direct children.
- Uncontrolled: no state, no context. Selection lives in the DOM — use `defaultChecked` on a
  child and read via child refs or `FormData` (single value under `name`).
- `name` is applied to the radios, not the `<fieldset>` element. `disabled` (native fieldset
  attribute) disables every radio via the platform. Ref forwards to the `<fieldset>`.
- Consumer `aria-describedby` merges with the generated error id (`useId` — id generation, not
  state). Consumer `style`/`className` pass through and win.

## Tokens consumed

- Layout: `--iso-spacing-2` (stack gap, legend margin-block-end, vertical option gap,
  horizontal row-gap), `--iso-spacing-4` (horizontal column-gap), `--iso-spacing-0`
  (fieldset margin/padding/min-inline-size + legend padding — UA chrome reset).
- Legend typography: `--iso-font-family-sans`, `--iso-font-size-sm`,
  `--iso-font-weight-semibold`, `--iso-line-height-normal`, `--iso-color-text`.
- Error text: `--iso-font-family-sans`, `--iso-font-size-sm`, `--iso-font-weight-regular`,
  `--iso-line-height-normal`, `--iso-color-critical-subtle-fg`.
- No motion: nothing animates, so no duration/easing tokens and no reduced-motion guard.
- Focus rings, radio accent color, sizes, and disabled text come from the composed RadioButton.

## Accessibility

Native `fieldset`/`legend` → `role="group"` named by the legend; no ARIA beyond
`aria-describedby` for the error. Keyboard is entirely platform behavior: Tab reaches the group,
arrow keys rove within the shared-`name` radios, Space selects. Disabled uses the real fieldset
`disabled` attribute (cascades to every radio). The legend is hoisted out of the fieldset's flex
flow by browsers, so its bottom spacing is a margin token rather than the container gap.

## Stories / tests must cover

Stories: playground, horizontal, sizes (sm/md/lg passed down), error, disabled fieldset, child
overrides (own `size` wins). Tests: role `group` + accessible name from legend, shared-`name`
injection + child's own `name` winning, FormData single-value proof after user-event clicks
(uncontrolled), native mutual exclusion (second click unchecks the first), size passdown and
both directions render, non-element children pass through, error wired via `aria-describedby`
(plus merging with consumer-provided ids and absence when no error), ref forwards to
`HTMLFieldSetElement`, fieldset `disabled` cascades, axe in both directions.
