# Calendar — contract

Wraps: **`<input>`** (exactly one) as a date-family control — `type="date"` (a calendar day) or
`type="datetime-local"` (a day + a wall-clock time). **Platform-native**: no `appearance: none` —
the browser draws the internal fields, the calendar/clock picker indicator, and the popover; it
parses the locale display format and validates. Input's date-family twin. Pain points removed:
uncontrolled by construction (`value` is not a prop — set `defaultValue` in the native
`yyyy-mm-dd` / `yyyy-mm-ddThh:mm` value format; read the current value through the forwarded ref or
`FormData`), and `invalid` sets `aria-invalid` + the critical border in one prop.

## UI model (`CalendarProps` extends `Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'size' | 'checked' | 'children' | 'type'>`)

| Prop      | Values                  | Default |
| --------- | ----------------------- | ------- |
| `type`    | `date · datetime-local` | `date`  |
| `size`    | `sm · md · lg`          | `md`    |
| `invalid` | `boolean`               | `false` |

- `type` narrowed to the two date-family controls (the ISO value formats differ: `yyyy-mm-dd`
  vs `yyyy-mm-ddThh:mm`). Other date-adjacent types (`month` / `week` / `time`) are out of scope.
- `value` / `checked` omitted: enforce uncontrolled usage (principle 2). Use `defaultValue`.
- `children` omitted: `<input>` is a void element — children would type-check but crash at runtime.
- Native char-width `size` attribute omitted: `size` is the variant prop, and a date field's width
  is fixed by its locale format, so char width is meaningless (no `htmlSize` escape hatch here).
- `min` / `max` / `step` and every other native input prop (`name`, `required`, `disabled`,
  `onChange`, `aria-label`, …) spread onto the `<input>`. `className` merges onto it. Ref forwards
  to the `<input>`.

## Tokens consumed

- Size: `--iso-size-control-<size>` (height), `--iso-spacing-3/4/5` (padding-inline),
  `--iso-font-size-sm/md/lg`.
- Surface/shape/type: `--iso-color-surface`, `--iso-border-width-1`,
  `--iso-color-border-control` (control boundary — meets WCAG 1.4.11 non-text contrast),
  `--iso-radius-md`, `--iso-color-text`, `--iso-font-family-sans`,
  `--iso-font-weight-regular`, `--iso-line-height-tight`.
- Picker tint: `--iso-color-accent-solid-bg` via `accent-color` (indicator + popover selection;
  no custom drawing). The `::-webkit-calendar-picker-indicator` gets `cursor: pointer`.
- Invalid: `--iso-color-critical-solid-bg` as border-color **plus** an inset
  `--iso-border-width-1` box-shadow ring, so the boundary reads as 2px without layout shift —
  perceivable beyond a hue shift. The focus ring stays focus-colored.
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring`.
- Motion: `--iso-duration-fast`, `--iso-easing-standard` (disabled under
  `prefers-reduced-motion`).
- Disabled: `--iso-color-surface-sunken`, `--iso-color-text-disabled`, `cursor: not-allowed`.

## Accessibility

Native date-input semantics — no ARIA role added (date inputs expose no ARIA role, so tests query
by accessible name via `getByLabelText`, not `getByRole`). The component renders no label —
consumers must associate one (`<label>`, `aria-label`, or `aria-labelledby`); FormField handles
this at the molecule tier. `invalid` maps to `aria-invalid="true"` (attribute omitted otherwise,
and a consumer-passed `aria-invalid` can still override). Disabled uses the real `disabled`
attribute. Keyboard field editing, the picker popover, and format parsing are all platform
behavior. Focus via `:focus-visible` ring tokens.

## Stories / tests must cover

Stories: playground, both types, 3 sizes, invalid (all sizes), disabled (empty + filled),
`defaultValue`, datetime-local, `min`/`max` range, `step`. Tests: accessible name + `type=date`,
`type=datetime-local` renders, each size renders, ref forwarding, uncontrolled `date` and
`datetime-local` `defaultValue` read through the ref, `onChange` on edit + new value through the
ref, FormData submission under `name`, `min`/`max` pass-through, `aria-invalid` set when `invalid`
/ absent otherwise, disabled attribute, axe.
