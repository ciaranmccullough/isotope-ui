# atoms — rules

An atom wraps **exactly one native element** and removes its pain points. Nothing more.

- One native/semantic element at the core (`<button>`, `<input>`, `<img>`, `<progress>`, `<li>`…).
  Spreads the element's remaining native props (`ComponentPropsWithoutRef<'x'>`).
- **No composition of other components** — atoms never import other atoms. (Exception by explicit
  contract: `Counter` composes `Button` + `Input`; its CLAUDE.md documents why.)
- Dumb: renders from props only. No `useState`/`useReducer`/`useEffect` for values or behavior.
- Uncontrolled where it's a form control: no `value` prop — use `defaultValue`/`defaultChecked`;
  the consumer reads via ref/`FormData`.
- `React.forwardRef` to the native element, always.
- Styling: co-located `*.module.css`, every value a `var(--iso-*)` token. Variants map className
  from typed unions in `*.types.ts`.
- File set per atom: `X.tsx` · `X.types.ts` · `X.module.css` · `X.stories.tsx` · `X.test.tsx` ·
  `index.ts` · `CLAUDE.md`. Export from `src/atoms/<X>/index.ts`, wire into `src/index.ts`.
- Tests: query by role/accessible name; assert ref exposes the native element; include a
  `jest-axe` check. No integration tests for atoms.
