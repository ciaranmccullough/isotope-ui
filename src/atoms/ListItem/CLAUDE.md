# ListItem — contract

Wraps: **`<li>`** (exactly one).

**Nearly bare on purpose.** A list item's layout, spacing, indentation, and marker styling are
decisions of the _list_, not the item — they belong to the List molecule (the parent `<ul>`/`<ol>`)
that composes this atom later. ListItem adds nothing the native `<li>` doesn't already do;
typography inherits. The single pain point removed: opting out of the inherited marker
(`marker="none"`) for items that carry their own visuals (cards, rows, nav entries), which
otherwise requires the consumer to hand-write `list-style: none`.

## UI model (`ListItemProps` extends `ComponentPropsWithoutRef<'li'>`)

| Prop     | Values           | Default   |
| -------- | ---------------- | --------- |
| `marker` | `inherit · none` | `inherit` |

No other styling props. Content is `children`. Ref forwards to the `<li>`.

## Tokens consumed

**None.** This atom draws nothing of its own: `.list-item` and `.marker-inherit` have no
declarations (native `<li>` behavior is already correct), and `.marker-none` sets only the
keyword `list-style: none`. No animation/transition, so no reduced-motion guard; the element is
not focusable, so no focus-ring tokens.

## Accessibility

Native `listitem` role from `<li>` inside a `<ul>`/`<ol>` — no ARIA added. Consumers must render
ListItem inside a list element for valid nesting (tests and stories always do). Known platform
quirk: Safari/VoiceOver drops list semantics when `list-style: none` is applied; the List
molecule is the right place to restore them (explicit `role="list"` on the parent) since it owns
the parent element.

## Stories / tests must cover

Stories: playground inside a `<ul>` decorator, items in `<ul>` and `<ol>`, `marker="none"`, and
an inherit-vs-none comparison — all inside plain native lists, noting the List molecule composes
this atom later. Tests: `listitem` role + accessible content inside a `<ul>` harness, each
`marker` variant renders, ref exposes `HTMLLIElement`, `onClick` fires via user-event, axe
(rendered inside a `<ul>` for valid nesting).
