# Image — contract

Wraps: **`<img>`** (exactly one). Pain points removed:

- `loading` defaults to `"lazy"`, `decoding` defaults to `"async"` (the platform defaults —
  eager + sync-ish — are the wrong call for almost every image).
- **Priority rule:** if `fetchPriority="high"` is passed, the default `loading` flips to
  `"eager"` — a high-priority (hero/LCP) image should not lazy-load. Explicit
  `loading`/`decoding` props always win over both defaults.
- `alt` is required at the type level (`""` for decorative images) — no more forgotten alt text.

## UI model (`ImageProps` extends `ComponentPropsWithoutRef<'img'>`, `alt` re-declared required)

| Prop          | Values                                         | Default             |
| ------------- | ---------------------------------------------- | ------------------- |
| `alt`         | `string` (**required**; `""` for decorative)   | —                   |
| `aspectRatio` | any CSS `aspect-ratio` string, e.g. `'16 / 9'` | — (natural ratio)   |
| `fit`         | `cover · contain · fill · scale-down · none`   | — (platform `fill`) |
| `radius`      | `none · sm · md · lg · xl · full`              | `none`              |

`aspectRatio` is content-shaped, so it is an inline style, not a token variant; an
`aspectRatio` inside the consumer's `style` prop wins over it. `srcSet`, `sizes` and
`fetchPriority` pass through natively (React 19 camelCase `fetchPriority`). No other styling
props. Ref forwards to the `<img>`.

## Tokens consumed

- Radius: `--iso-radius-none/sm/md/lg/xl/full` (one class per variant).
- Base class is purely structural (`display: block`, `max-width: 100%`, `height: auto`) and
  `fit-*` classes are `object-fit` keywords — no visual raw values, nothing else to tokenize.
- No motion: nothing animates, so no duration/easing tokens and no reduced-motion guard needed.
- No focus ring: `<img>` is not focusable, so the `:focus-visible` ring tokens do not apply.

## Accessibility

Native `<img>` semantics — no ARIA added. The required `alt` makes the accessible name a compile
error to omit; `alt=""` correctly demotes decorative images to `role="presentation"`. Reserving
space via `aspectRatio` (or native `width`/`height`) prevents layout shift, which is a cognitive/
motor a11y win as much as a performance one.

## Stories / tests must cover

Stories: playground (lazy/async defaults), all 6 radii, all 5 fits (in a fixed box so the
behavior is visible), aspect ratios, `fetchPriority="high"` (eager default), explicit
`loading="lazy"` beating the priority rule, `srcSet`/`sizes` passthrough, decorative `alt=""`.

Tests: role `img` + accessible name; `loading="lazy"`/`decoding="async"` defaults;
`fetchPriority="high"` flips loading to eager (and `fetchpriority` reaches the DOM);
`fetchPriority="low"` keeps lazy; explicit `loading`/`decoding` win; every radius and fit
renders; `aspectRatio` inline style (alone and merged with consumer `style`); `srcSet`/`sizes`
passthrough; ref is an `HTMLImageElement` with native reads (`.src`); native `onLoad` fires
(fireEvent — user-event cannot synthesize resource load events); axe on informative +
decorative images.
