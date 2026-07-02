# isotope-ui — global contract

React component library. Native web platform first: real HTML elements (`<dialog>`, `<img>`,
`<select>`, `<video>`, `<input type="radio">`…), with only the well-known pain points removed.
Never re-implement behavior the browser gives us for free.

## The 8 core principles (non-negotiable)

1. **Dumb UI, no internal state.** Components render from props (a UI model). No `useState` for
   values. State lives in the consuming app; changes surface via callbacks or refs.
2. **Uncontrolled forms via refs.** Form components are uncontrolled; values are read through
   `ref` / `FormData` on submit. All components forward refs (`React.forwardRef`).
3. **Tokens drive everything.** Every spacing/radius/color/size/font/duration/z-index resolves to
   a token (`--iso-*` CSS custom property). No magic numbers, no hardcoded hex — anywhere.
4. **Variants are structured.** `size` / `tone` / `emphasis` map to token sets via typed unions
   declared in `*.types.ts`. No ad-hoc styling props.
5. **CSS Modules for scoping.** One co-located `*.module.css` per component. No CSS-in-JS runtime.
6. **CSS for animation.** Transitions/`@keyframes` first; native Web Animations API only when CSS
   genuinely can't express it. Durations/easings come from `motion` tokens. No animation libraries.
7. **Output is JSX.** Plain React function components.
8. **Accessibility is a requirement.** Correct semantic element first; ARIA only to fill gaps.
   Keyboard and focus behavior must work. Every component passes `jest-axe`.

## Stack

pnpm · TypeScript strict · Vite library build (ESM + d.ts) · CSS Modules · Storybook (react-vite)
· Jest + Testing Library + jest-axe (single runner for the whole repo) · ESLint (incl. jsx-a11y)
and Prettier · Husky with lint-staged · changesets · Conventional Commits.

## Definition of done (per component)

1. Native/semantic element at its core (or a documented reason there isn't one).
2. Dumb, uncontrolled; value via ref, zero internal state.
3. Variants mapped to tokens; zero magic values in CSS or TSX.
4. Co-located `*.module.css` using `--iso-*` custom properties; CSS animation only.
5. Forwarded ref; exported prop + UI-model types from `*.types.ts`.
6. Stories covering every variant and state.
7. Full file set: `X.tsx`, `X.types.ts`, `X.module.css`, `X.stories.tsx`, `X.test.tsx`, `index.ts`, `CLAUDE.md`.
8. Unit tests: roles/accessible names, ref value reads, callbacks, axe. Integration test only for
   composed flows (see `tests/CLAUDE.md`).
9. Local `CLAUDE.md` documenting the component contract.
10. Exported from the tier barrel and `src/index.ts`.

## Forbidden

Internal state for values · controlled form inputs · hardcoded colors/spacing/durations ·
CSS-in-JS · JS animation where CSS suffices · third-party animation/router/component deps ·
re-implementing native element behavior.

## Workflow

After each component: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` — commit only when
green (Conventional Commits). Do not start a tier until the tier below is green.
