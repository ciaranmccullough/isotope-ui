# Contributing to isotope-ui

## Dev environment

- Node 24 (`nvm use` reads [.nvmrc](.nvmrc); consumers need ≥ 20.19 per `engines`), [pnpm](https://pnpm.io) ≥ 10.
- `pnpm install` — installs deps and sets up Husky git hooks.

## Scripts

| Script              | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `pnpm storybook`    | Storybook dev server on :6006                                |
| `pnpm test`         | Jest + Testing Library + jest-axe                            |
| `pnpm lint`         | ESLint (incl. jsx-a11y) + Prettier check                     |
| `pnpm typecheck`    | `tsc --noEmit` (strict)                                      |
| `pnpm build`        | Tokens → Vite library build → ESM + d.ts + CSS               |
| `pnpm build:tokens` | Regenerate `src/tokens/tokens.css` from the TS token modules |
| `pnpm changeset`    | Record a changeset for your change                           |
| `pnpm release`      | Publish to npm, push the tag, and create the GitHub Release  |

## Git hooks (Husky)

- **pre-commit** — lint-staged: Prettier + ESLint `--fix --max-warnings=0` on staged files.
- **pre-push** — `pnpm typecheck && pnpm test && pnpm build`.
- **commit-msg** — commitlint (Conventional Commits: `feat(button): …`, `fix(tokens): …`).

CI re-runs everything; hooks are a convenience, not the only line of defense.

## Adding a component

Read the `CLAUDE.md` in the tier folder first — it is the contract. Every component ships this
file set, in its own folder:

```
src/<tier>/<Name>/
├── <Name>.tsx           # ref-forwarded, dumb, native element at the core
├── <Name>.types.ts      # exported prop types + variant unions
├── <Name>.module.css    # token-driven (--iso-*), CSS animation only
├── <Name>.stories.tsx   # every variant and state
├── <Name>.test.tsx      # roles/accessible names, ref reads, axe
├── index.ts             # barrel
└── CLAUDE.md            # the component's local contract
```

### Definition of done

1. Native/semantic element at the core (or documented reason there isn't one).
2. Dumb + uncontrolled — no internal state; values via ref/`FormData`.
3. Variants map to tokens; zero magic values.
4. Stories cover every variant/state; tests pass axe.
5. Exported from the tier barrel and `src/index.ts`.
6. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` green.
7. A changeset (`pnpm changeset`) if the public API changed.

## Pull requests

- One component (or one coherent change) per PR.
- PRs must be green on CI and include stories + tests — reviewers look at the Storybook build
  first.
- No new runtime dependencies without prior discussion in an issue.

## Releasing

Versioning is [changesets]. Publishing to npm is **manual** (no `NPM_TOKEN` in CI).

1. Land your changes with a changeset (`pnpm changeset`) — see "Definition of done".
2. On merge to `main`, the Release workflow opens/updates a **"Version Packages" PR** that bumps
   the version and writes `CHANGELOG.md`.
3. Merge that PR.
4. From an npm-authenticated machine (`npm login`), on an up-to-date `main`:

   ```sh
   pnpm release
   ```

   This builds, publishes to npm (`changeset publish`), pushes the `isotope-ui@<version>` tag, and
   creates the matching GitHub Release from the CHANGELOG (`scripts/github-release.mjs`).

[changesets]: https://github.com/changesets/changesets
