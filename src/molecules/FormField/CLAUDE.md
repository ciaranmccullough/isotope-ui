# FormField — contract

Composes: **`<label>` + exactly one form control child + optional description/error `<p>`s** in a
`<div>` wrapper. This is the a11y-wiring molecule: it owns the id plumbing (`htmlFor`,
`aria-describedby`, `aria-invalid`, `required`) and nothing else. The control stays uncontrolled;
values are read via ref/`FormData` as always.

## UI model (`FormFieldProps` extends `Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'id'>`)

| Prop          | Values                                            | Default      |
| ------------- | ------------------------------------------------- | ------------ |
| `label`       | string (required)                                 | —            |
| `description` | string                                            | —            |
| `error`       | string (critical tone, wires `aria-invalid`)      | —            |
| `required`    | boolean                                           | `false`      |
| `id`          | string — id for the **control**, not the wrapper  | `useId()`    |
| `children`    | exactly one `ReactElement<FormFieldControlProps>` | — (required) |

No variant props. Ref forwards **into the cloned control** (typed `HTMLElement` — narrow at the
call site), never the wrapper `<div>`; a ref the consumer already set on the child is merged, not
replaced. The consumer `style` prop lands on the wrapper untouched and always wins (FormField
sets no inline styles).

## Injection contract (`cloneElement`)

FormField clones its single child and injects only wiring props (`FormFieldControlProps`):

- `id` — always injected; **FormField owns id wiring** (label `htmlFor` and the
  description/error ids derive from it), so a child-set `id` is overridden. This is the one
  exception to consumer-wins.
- `aria-describedby` — space-joined ids of **only the paragraphs that render** (description
  and/or error). Skipped if the consumer set their own on the child (the derived ids are
  `` `${id}-description` `` / `` `${id}-error` `` if they want to include them manually).
- `aria-invalid: true` — while `error` is set. That attribute alone produces the critical
  border on library controls: Input and Select style `[aria-invalid='true']` in their own CSS,
  so FormField needs no component-identity checks and never injects non-platform props onto
  unknown elements.
- `required` — while `required` is set. This is the platform way: screen readers announce the
  native attribute, and the label renders an `aria-hidden` asterisk (visual only — the
  accessible name stays the label text). No visually-hidden " (required)" text is added.

Every injected prop except `id` yields to a value the consumer set on the child themselves.

## Tokens consumed

- Layout: `--iso-spacing-1` (column gap; also asterisk inset).
- Label: `--iso-color-text`, `--iso-font-size-sm`, `--iso-font-weight-medium`,
  `--iso-line-height-snug`, `--iso-font-family-sans` (on the wrapper).
- Description: `--iso-color-text-secondary`, `--iso-font-size-sm`.
- Error + asterisk: `--iso-color-critical-subtle-fg`, `--iso-font-weight-medium` (error only).
- No motion (nothing animates) and no focus styles (FormField renders no focusable element —
  the control brings its own `:focus-visible` ring).

## Accessibility

Native `<label htmlFor>` does the naming — clicking the label focuses the control. Description
and error are plain `<p>`s referenced from the control's `aria-describedby`. The error paragraph
deliberately has **no `role="alert"`**: FormField is a dumb component that renders whatever
`error` it is given and cannot know when an error is "new"; announcement policy (live region,
focus move on submit…) belongs to the consumer. `aria-invalid` is set only while `error` exists.

## Stories / tests must cover

Stories: Input playground, description, error, required, native `<select>`, Counter. Tests:
label click focuses the control; generated + explicit id wiring; `aria-describedby` lists
exactly the rendered paragraph ids and shrinks as they disappear; `aria-invalid` toggling with
`error`; error text has no `role`; `required` reaches the control with the accessible name
unchanged; FormData reads the typed value under the control's `name`; forwarded ref reaches the
control element and merges with a consumer child ref; consumer child props win except `id`; axe
with and without error.
