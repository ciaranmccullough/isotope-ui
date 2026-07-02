# Th — contract

Wraps: **`<th>`** (exactly one). Pain point removed: `scope` defaults to `"col"` — devs forget
`scope` and screen readers lose the header/cell association. Row headers pass `scope="row"`;
spanned group headers pass `"colgroup"` / `"rowgroup"`.

## UI model (`ThProps` extends `Omit<ComponentPropsWithoutRef<'th'>, 'scope' | 'align'>`)

| Prop      | Values                               | Default |
| --------- | ------------------------------------ | ------- |
| `scope`   | `col · row · colgroup · rowgroup`    | `col`   |
| `align`   | `start · center · end` (logical/RTL) | `start` |
| `numeric` | `boolean`                            | `false` |

`numeric` sets `font-variant-numeric: tabular-nums` and `text-align: end`, and **takes precedence
over `align`** (the `.numeric` class is declared after the `.align-*` classes, winning the
equal-specificity tie). The native `scope`/`align` attributes are omitted and re-declared as typed
unions (the deprecated HTML `align` attribute is replaced by the CSS-driven variant). No other
styling props. Content is `children`. Ref forwards to the `<th>` (`HTMLTableCellElement`).

## Tokens consumed

- Type: `--iso-font-family-sans`, `--iso-font-size-sm`, `--iso-font-weight-semibold`,
  `--iso-color-text-secondary`.
- Box: `--iso-spacing-2` / `--iso-spacing-3` (block/inline padding), `--iso-border-width-1` +
  `--iso-color-border-strong` (bottom rule).
- No motion tokens (no animation → no `prefers-reduced-motion` guard needed) and no focus-ring
  tokens (a `<th>` is not focusable; interactive sorting belongs to a Button placed inside it).

## Accessibility

Native `<th>` semantics — no ARIA added. `scope="col"` by default maps to the `columnheader`
role; `scope="row"` maps to `rowheader`. Must be rendered inside a real `<tr>` (stories and tests
always wrap it in a `<table>`). Alignment uses logical `start`/`end` values so RTL locales flip
correctly.

## Stories / tests must cover

Stories: playground in a real table, all 3 alignments, numeric (incl. numeric-beats-align),
row headers, colgroup/rowgroup group scopes. Tests: columnheader role + accessible name, default
`scope="col"` attribute, `scope="row"` → rowheader role, each `align` value, `numeric`, ref
forwarding to `HTMLTableCellElement`, onClick via user-event, axe on a full table with column and
row headers.
