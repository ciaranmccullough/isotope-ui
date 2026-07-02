# Video — contract

Wraps: **`<video>`** (exactly one). Pain points removed: `playsInline` defaults to `true` (no
forced fullscreen takeover on iOS), `preload` defaults to `"metadata"` (no eager full-file
download), `controls` defaults to `true` (keyboard-operable out of the box). Explicit props
always win over these defaults.

## UI model (`VideoProps` extends `ComponentPropsWithoutRef<'video'>`)

| Prop          | Values                        | Default                           |
| ------------- | ----------------------------- | --------------------------------- |
| `radius`      | `none · sm · md · lg · xl`    | `none`                            |
| `fit`         | `cover · contain`             | unset (browser default `contain`) |
| `aspectRatio` | any CSS `aspect-ratio` string | unset (intrinsic ratio)           |

`aspectRatio` is applied as an inline style; an `aspectRatio` inside the consumer's `style`
prop wins over it. Library-wide rule: the `style` prop is the consumer escape hatch and always
wins over convenience props. Sources and the captions `<track>` are `children`. Ref forwards
to the `<video>`.
Base styling: `display: block`, `max-width: 100%`, `height: auto`, letterbox background.

## Tokens consumed

- Radius: `--iso-radius-none/sm/md/lg/xl` (one class per `radius` value).
- Letterbox background: `--iso-color-neutral-solid-bg` (visible when `fit="contain"` or
  `aspectRatio` letterboxes the frame).
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring` (the element is focusable
  while `controls` is on — the default).
- No animation/transition, so no motion tokens and no `prefers-reduced-motion` guard needed.

## Accessibility

- **Consumers must ship a `<track kind="captions">` as a child** (every story does, via a tiny
  inline `data:` VTT). `jsx-a11y/media-has-caption` is disabled once inside `Video.tsx` with a
  justification: children pass through opaquely, so the static rule cannot see the track.
  axe's `video-caption` rule still enforces it at runtime in consumer tests.
- **Never autoplay with sound**: if you set `autoPlay`, set `muted` too (see the
  `MutedAutoplayLoop` story).
- Give the video an accessible name (`aria-label` / `aria-labelledby`).
- `<video>` has no implicit ARIA role, so tests query by accessible name (`getByLabelText`),
  not `getByRole` — the one sanctioned deviation from the role-query rule.

## Stories / tests must cover

Stories: playground with captions track, all 5 radii, both fits (square box shows
letterbox vs crop), 3 aspect ratios, muted-autoplay-loop state. Tests: accessible name,
default attributes present (`controls`, `playsinline`, `preload="metadata"`), explicit
overrides win, each `radius`/`fit` renders, `aspectRatio` + `style` merge
(`style.aspectRatio` wins over the prop), ref is
`HTMLVideoElement`, children/track pass-through, `onClick` fires, axe (with captions track).
jsdom cannot play media — tests assert attributes only, never playback.
