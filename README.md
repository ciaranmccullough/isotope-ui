# isotope-ui

A React component library built on modern web standards and Atomic Design principles.

**Philosophy:** stay as native to the web platform as possible. isotope-ui uses real HTML
elements — `<dialog>`, `<img>`, `<select>`, `<video>`, `<progress>`, `<input type="radio">` — and
removes only the well-known pain points around them. It never re-implements behavior the browser
already gives you for free.

## Principles

- **Dumb components.** No internal state, ever. Each component renders from a UI model (props);
  state and behavior live in your app.
- **Uncontrolled forms.** Form controls are uncontrolled — read values through refs or `FormData`
  on submit. No re-render per keystroke.
- **Token-driven.** Every spacing, radius, color, size, font, duration, and z-index resolves to a
  design token, exposed as a `--iso-*` CSS custom property you can override freely.
- **Structured variants.** `size` / `tone` / `emphasis` are typed unions that map to token sets —
  not ad-hoc style props.
- **CSS Modules + CSS animation.** Locally scoped styles, zero CSS-in-JS runtime, motion via CSS
  transitions and `@keyframes` (Web Animations API only where CSS can't express it).
- **Accessible by default.** Semantic elements first, ARIA to fill gaps, `jest-axe` in every
  component's tests.

## Install

```sh
pnpm add isotope-ui
```

```tsx
import { Button } from 'isotope-ui';
import 'isotope-ui/styles.css'; // tokens + component styles

<Button tone="accent" size="md">
  Save
</Button>;
```

Only using the tokens? `import 'isotope-ui/tokens.css'`.

## Uncontrolled by design

```tsx
function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        api.signup(Object.fromEntries(data));
      }}
    >
      <FormField label="Email">
        <Input name="email" type="email" required />
      </FormField>
      <Button type="submit">Sign up</Button>
    </form>
  );
}
```

## Theming

All tokens are CSS custom properties on `:root`. Override any of them:

```css
:root {
  --iso-color-accent-solid-bg: #7c3aed;
  --iso-radius-md: 0;
}
```

The token _shape_ is fixed and documented in [docs/tokens.md](docs/tokens.md); the values are
yours.

## Component inventory

| Tier      | Components                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Atoms     | Text, Icon, Avatar, Button, Input, Switch, RadioButton, Progress, Skeleton, Image, Video, Link, Counter, ListItem, Caption, Th, Td, Tr |
| Molecules | FormField, Select, RadioGroup, List, TableSection (Thead/Tbody/Tfoot), Toast                                                           |
| Organisms | Dialog, Table, Navbar, Footer, ToastProvider/ToastRegion                                                                               |

Status: under active development, building atoms-first. See the repo issues/PRs for progress.

## Development

```sh
pnpm install
pnpm storybook   # component workbench
pnpm test        # Jest + Testing Library + jest-axe
pnpm lint && pnpm typecheck && pnpm build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the component checklist and
[docs/architecture.md](docs/architecture.md) for how the library is put together.

## License

[MIT](LICENSE)
