# Navbar — contract

Wraps: **`<nav>`** (a navigation landmark; default `aria-label` "Main", always overridable).
Pure layout organism — slots arrange consumer content, no menu/collapse/route state.

## UI model (`NavbarProps` extends `ComponentPropsWithoutRef<'nav'>`)

| Prop      | Values                                          | Default |
| --------- | ----------------------------------------------- | ------- |
| `brand`   | ReactNode (leading slot)                        | —       |
| `actions` | ReactNode (trailing slot, auto-pushed right)    | —       |
| `sticky`  | boolean (`position: sticky` + `--iso-z-sticky`) | `false` |

`children` = the navigation items (compose `List direction="horizontal"` + `ListItem` + `Link`).

## Tokens consumed

`--iso-spacing-2/3/6` (gaps/padding), `--iso-spacing-0` (sticky offset), `--iso-color-surface`,
`--iso-color-border` + `--iso-border-width-1` (bottom rule), `--iso-color-text`,
`--iso-font-family-sans`, `--iso-font-weight-semibold` + `--iso-font-size-lg` (brand),
`--iso-z-sticky`.

## Accessibility

Landmark named via `aria-label` (default "Main") so multiple nav regions stay distinguishable.
No ARIA beyond that — links/buttons carry their own semantics. Responsive collapse (hamburger)
is consumer territory: it requires state, which this library never owns.

## Stories / tests must cover

Default landmark name + override, all three slots rendered and queryable by role, sticky, ref
(NAV element), axe on the fully composed bar.
