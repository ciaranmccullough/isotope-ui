# SearchBar — contract

Composes: **`<form role="search">` + the Input atom (`type="search"`) + a decorative magnifier
`Icon` + an optional `aria-hidden` `<kbd>` hint**. The Input keeps every bit of its own chrome —
border, focus ring, sizes, invalid treatment, disabled state; the molecule only overlays the
icon/hint and widens the input's paddings under them (token-only `calc()`). Platform-first:
Enter submits the form natively; `type="search"` brings the UA clear affordance and the right
mobile keyboard; `action` + `name` gives zero-JS GET search.

## UI model (`SearchBarProps` extends `Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'size' | 'checked' | 'children' | 'type' | 'onSubmit'>`)

| Prop           | Values                                              | Default  |
| -------------- | --------------------------------------------------- | -------- |
| `size`         | `sm · md · lg` (Input size; icon/paddings track it) | `md`     |
| `label`        | string — names landmark **and** searchbox           | `Search` |
| `shortcutHint` | string — visual-only `<kbd>` (e.g. `⌘K`)            | —        |
| `invalid`      | `boolean` → `aria-invalid` + critical border        | `false`  |
| `htmlSize`     | `number` (chars) — native input `size` attribute    | —        |
| `onSubmit`     | `FormEventHandler<HTMLFormElement>` — on the form   | —        |
| `action`       | form `action` — zero-JS native GET search           | —        |

- Uncontrolled: `value` omitted; use `defaultValue`, read via the ref or `FormData` on submit
  (give the input a `name`). SPA consumers call `event.preventDefault()` in `onSubmit`.
- Prop routing: `className`/`style` merge onto the root `<form>`; `onSubmit`/`action` go to the
  form; everything else (placeholder, `name`, `defaultValue`, `onChange`, `disabled`,
  `required`, `id`…) spreads onto the input. A consumer `aria-label` in rest lands on the input
  after the injected one, so it wins there (the landmark keeps `label`).
- Ref forwards to the **`<input>`** (the primary interactive element — molecule rule).
- The shortcut hint is presentation only: the actual global keybinding is consumer behavior; a
  dumb component registers no listeners. The end-padding reserve fits short hints ("⌘K",
  "Ctrl K", ≤ ~6 characters) — longer strings will overlap the query text, so keep hints short.

## Tokens consumed

- Overlay geometry: `--iso-spacing-3/4/5` (offsets mirror the Input's per-size padding),
  `--iso-size-icon-sm/md/lg` + `--iso-spacing-2` (start padding widening),
  `--iso-spacing-12` (end reserve under the hint), all via `calc()` of tokens only.
  Two-class specificity (`.size-* .input`) beats the Input's single size class.
- Icon: `--iso-color-text-muted` (matches the Input's placeholder), sized by its own class.
- Hint: `--iso-border-width-1` + `--iso-color-border`, `--iso-radius-sm`,
  `--iso-color-surface-sunken`, `--iso-color-text-secondary`, `--iso-font-family-mono`,
  `--iso-font-size-xs`, `--iso-line-height-normal`, `--iso-spacing-1` (padding).
- Disabled: `--iso-color-text-disabled` on both overlays via `:has(.input:disabled)` (covers
  `<fieldset disabled>` ancestors too).
- No motion or focus tokens of its own — the Input brings its transition, reduced-motion guard
  and focus ring; the overlays are `pointer-events: none` so clicks always reach the input.

## Accessibility

`role="search"` on the form is the canonical, universally-mapped landmark (the bare `<search>`
element is younger and adds nothing here). `label` names the landmark (`aria-label`) and the
searchbox (`aria-label` on the input) — pass a specific one ("Search candidates") when a page
has several search bars. The icon is decorative (Icon's default `aria-hidden`); the `<kbd>` hint
is `aria-hidden` because it duplicates no semantics and announces nothing actionable. Keyboard:
Tab reaches only the input; Enter submits natively; Escape clears in UAs that implement the
search-input affordance.

## Stories / tests must cover

Stories: playground, three sizes, shortcut hint (widened root), `defaultValue`, disabled (with
hint), invalid, submit-reading FormData, zero-JS GET (`action` + `name`). Tests: landmark +
searchbox both named (default and custom `label`), sizes render, ref → `HTMLInputElement` of
`type="search"`, typed value via ref, `defaultValue`, Enter submits once with the query readable
from `FormData`, `onChange` fires per keystroke, hint renders only when provided and stays
`aria-hidden` inside a `<kbd>`, `aria-invalid` set/absent, disabled blocks typing,
className/style land on the root form, `action` passthrough, axe fully loaded.
