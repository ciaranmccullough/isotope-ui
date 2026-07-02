# Architecture

## Atomic Design, adapted

```
tokens  →  atoms  →  molecules  →  organisms
```

- **tokens** (`src/tokens/`) — the design contract. Typed TS modules, emitted as `--iso-*` CSS
  custom properties in a generated `tokens.css`.
- **atoms** (`src/atoms/`) — one native element each, pain points removed. No composition
  (single documented exception: `Counter`, which composes `Button` + `Input` — see
  `src/atoms/CLAUDE.md`).
- **molecules** (`src/molecules/`) — compose atoms, wire a11y relationships, stay uncontrolled.
- **organisms** (`src/organisms/`) — complete UI regions built from molecules/atoms. No business
  logic; open/queue state lives with the consumer.

Build order follows the tiers: a tier starts only when the tier below is green.

## Why components are dumb

Every component renders from a UI model (props) and owns zero state. Form controls are
uncontrolled — the DOM is the source of truth, read via refs/`FormData`. This keeps the library:

- **Predictable** — no hidden state to fight; what you pass is what renders.
- **Fast** — no re-render per keystroke, no context churn.
- **Composable** — any state manager (or none) works on top.

## Platform-native decisions

| Instead of…                         | isotope-ui uses…                                    |
| ----------------------------------- | --------------------------------------------------- |
| Focus-trap libraries, portal stacks | `<dialog>.showModal()` + `::backdrop`               |
| Custom dropdown menus for forms     | styled native `<select>`                            |
| Div-based tables                    | real `<table>/<thead>/<th scope>` semantics         |
| JS animation libraries              | CSS transitions/`@keyframes`, WAAPI as escape hatch |
| Router coupling                     | polymorphic `Link` (`as`/`asChild`)                 |
| Image lazy-load libraries           | `<img loading decoding srcset sizes fetchpriority>` |

## Build output

Vite library mode → ESM (`dist/index.js`) + type declarations + extracted CSS
(`dist/isotope-ui.css` = tokens + component styles; `dist/tokens.css` = tokens only).
`sideEffects` is scoped to CSS so JS exports tree-shake cleanly.

## Repository layout

See the root README and `CLAUDE.md` files in each folder — every tier carries its own contract
(`src/atoms/CLAUDE.md`, `src/molecules/CLAUDE.md`, `src/organisms/CLAUDE.md`,
`src/tokens/CLAUDE.md`, `tests/CLAUDE.md`).
