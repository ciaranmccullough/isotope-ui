# Avatar — contract

Wraps: **`<img>`** (exactly one native element per render). Pain points removed: the types force
`alt` whenever `src` is set, and the no-image case needs no hand-rolled fallback — omit `src` and
a stateless initials fallback renders instead. The fallback is the documented reason a non-`<img>`
element can appear: without a source there is no image, so a `<span role="img">` stands in.

## UI model (`AvatarProps` = `AvatarImageProps | AvatarFallbackProps`, discriminated on `src`)

| Prop   | Values                   | Default | Notes                                                                                                    |
| ------ | ------------------------ | ------- | -------------------------------------------------------------------------------------------------------- |
| `src`  | `string`                 | —       | Present → `<img>` branch (native img props spread). Absent → fallback branch (native span props spread). |
| `alt`  | `string`                 | —       | **Required whenever `src` is set** — the image branch will not compile without it.                       |
| `name` | `string`                 | —       | Source of the fallback initials and the fallback `aria-label`. Ignored by the `<img>` branch.            |
| `size` | `xs · sm · md · lg · xl` | `md`    | Maps to `--iso-size-avatar-*`.                                                                           |

No other styling props. No `children`. Ref forwards to whichever element rendered
(`HTMLImageElement | HTMLSpanElement`).

Branching is pure render logic — **zero internal state**:

- `src` set → native `<img>` with `object-fit: cover`, clipped to a circle.
- no `src` → `<span role="img" aria-label={name}>` showing initials: first letter of the first
  and last words of `name`, uppercased (single word → one letter; computed by a pure function).

**Load errors are the consumer's job.** The atom never watches the image: attach your own
`onError` (it spreads through to the `<img>`) and re-render the same Avatar without `src` — the
initials fallback renders. This keeps the atom dumb per the global contract.

## Tokens consumed

- Size: `--iso-size-avatar-xs/sm/md/lg/xl` (width and height).
- Initials type scale: `--iso-font-size-xs/sm/md/lg/2xl` — `size-xl` uses `--iso-font-size-2xl`
  (not `-xl`) to hold the ~37% initials-to-avatar optical ratio of the `lg` step; there is no
  dedicated avatar font-size token group.
- Shape: `--iso-radius-full` (circle).
- Fallback surface: `--iso-color-neutral-subtle-bg` / `--iso-color-neutral-subtle-fg`,
  `--iso-font-family-sans`, `--iso-font-weight-medium`, `--iso-line-height-tight`.
- No motion tokens (nothing animates, so no `prefers-reduced-motion` block) and no focus-ring
  tokens (the avatar is not focusable or interactive).

## Accessibility

Image branch: native `<img>` semantics with a type-enforced `alt`. Fallback branch:
`role="img"` + `aria-label={name}` so the initials read as a single image with the person's
name. **Provide `name` whenever `src` is absent** — a fallback without `name` has no accessible
name (axe `role-img-alt` fails); that combination is a consumer error, not a supported state.
Not interactive: no focus ring, no keyboard behavior.

## Stories / tests must cover

Both branches at all 5 sizes; initials edge cases (single word, first+last of 3+ words,
lowercase input uppercased, surrounding/extra whitespace); accessible name from `alt` (img) and
`name` (fallback); ref forwarding to `<img>` (with `src` readable through the ref) and to
`<span>`; native handler passthrough (`onClick` via user-event, `onError` via a dispatched error
event — jsdom cannot load images); axe on both branches.
