---
'isotope-ui': minor
---

Add the **Calendar** atom — a native date `<input>` with a `type` variant (`date` |
`datetime-local`, default `date`). Uncontrolled by construction (no `value` prop; set
`defaultValue` in the native `yyyy-mm-dd` / `yyyy-mm-ddThh:mm` format and read via the forwarded
ref or `FormData`), with `size` and `invalid` variants. Platform-native: the browser draws the
calendar/clock popover and validates; `accent-color` tints the picker indicator and
`min` / `max` / `step` pass straight through.
