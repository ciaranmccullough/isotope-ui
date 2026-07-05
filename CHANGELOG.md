# isotope-ui

## 0.3.0

### Minor Changes

- 5b6c50f: Add the **Calendar** atom — a native date `<input>` with a `type` variant (`date` |
  `datetime-local`, default `date`). Uncontrolled by construction (no `value` prop; set
  `defaultValue` in the native `yyyy-mm-dd` / `yyyy-mm-ddThh:mm` format and read via the forwarded
  ref or `FormData`), with `size` and `invalid` variants. Platform-native: the browser draws the
  calendar/clock popover and validates; `accent-color` tints the picker indicator and
  `min` / `max` / `step` pass straight through.

### Patch Changes

- 5b6c50f: **FormField** now reads a child's existing ref from the location the running React major uses —
  `props.ref` on React 19, `element.ref` on React 18 and earlier — so merging a consumer-set child
  ref no longer trips React 18.3's "ref is not a prop" dev warning. Behaviour is unchanged.

## 0.2.0

### Minor Changes

- Add four components: the Checkbox and Tag atoms and the Chip and SearchBar molecules.

  - **Checkbox** (atom) — native `<input type="checkbox">` wrapped in its label, tinted via
    `accent-color`; uncontrolled (`defaultChecked`, ref/FormData reads); `indeterminate` stays a
    consumer-set DOM property through the ref.
  - **Tag** (atom) — small non-interactive tonal label (five subtle tones) for categories and
    metadata.
  - **Chip** (molecule) — pill status/filter label with an optional decorative status dot and an
    optional remove affordance (`onRemove` + `removeLabel`) composing a compacted ghost Button.
  - **SearchBar** (molecule) — `form[role="search"]` composing the Input atom (`type="search"`)
    with a decorative magnifier icon and an optional `aria-hidden` keyboard-shortcut hint; Enter
    submits natively, `action` + `name` enables zero-JS GET search.

## 0.1.0

### Minor Changes

- affb7fb: Initial release: the `--iso-*` design-token layer (spacing, radii, colors, shadows, borders,
  sizing, typography, motion, z-index, breakpoints), 18 atoms, 6 molecules, and 5 organisms —
  platform-native, dumb, uncontrolled, token-driven, and accessibility-tested (jest-axe + WCAG
  contrast-checked tone tokens). Ships ESM + bundled types + extracted CSS with a `'use client'`
  banner for React Server Components.
