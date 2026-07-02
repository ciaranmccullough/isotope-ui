# tests — how to write them here

Everything runs on **Jest** + Testing Library — one runner, one config (`jest.config.cjs`).
`tests/setup.ts` registers `@testing-library/jest-dom` and the `jest-axe` matcher.

## Unit tests (co-located `src/**/X.test.tsx`) — every component

- Query by **role and accessible name** (`getByRole('button', { name: 'Save' })`). Never by
  class, tag, or test-id.
- Assert: each variant renders; the forwarded ref exposes the native element and its value
  (uncontrolled reads); callbacks fire on interaction.
- Include one `expect(await axe(container)).toHaveNoViolations()` assertion.
- Prefer `@testing-library/user-event` over `fireEvent`.

## Integration tests (`tests/integration/*.integration.test.tsx`) — only where valuable

Composed flows where **composition is the risk**: Table assembled from data, FormField +
Select/RadioGroup submitting via refs/`FormData`, Dialog open/close + focus/backdrop, ToastRegion
queueing/stacking. **Never** for atoms — a unit test is enough there.

## Shared rules

- No snapshot tests of markup.
- No testing internal state — there is none by design.
- Every interactive component must pass axe.
- Tests document the contract: read a component's `CLAUDE.md` before writing its tests.
