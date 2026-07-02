# tokens — the design contract

Every visual value in isotope-ui resolves to a token defined here. Nothing outside this folder may
define a raw value (hex, px, ms, unitless z-index…).

## Shape

- One TS module per token group: `spacing`, `radii`, `colors`, `sizing`, `typography`, `motion`,
  `zIndex`, `breakpoints`. Each exports a `const`-asserted object + a `…Token` key-type union.
- `tokens.css` is **generated** — never edit by hand. Run `pnpm build:tokens` after changing any
  TS token module. A Jest test fails if TS and CSS drift.
- CSS custom property naming: `--iso-<group>-<key>` with nested keys joined by `-`
  (e.g. `--iso-spacing-4`, `--iso-color-accent-solid-bg`, `--iso-font-size-xl`).

## Rules

- Components consume tokens **only** via `var(--iso-*)` in their `*.module.css`.
- The token _shape_ is fixed and documented; values are consumer-overridable via CSS custom
  properties. Don't add one-off tokens for a single component — extend a group deliberately.
- Semantic colors (`text`, `surface`, `border`, tone sets) reference the palette; components
  reference semantic tokens, not raw palette entries, wherever a semantic token exists.
- Breakpoints cannot be used as `var()` inside `@media` queries (CSS limitation) — import the TS
  values where a JS consumer needs them, and keep any media query literal in sync with
  `breakpoints.ts` (note it in a comment).
