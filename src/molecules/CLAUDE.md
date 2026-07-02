# molecules — rules

A molecule composes **finished atoms** into a small functional unit.

- Compose atoms (and native elements) only — never organisms, never other molecules unless the
  contract documents it.
- Own no state. Uncontrolled throughout: form values are read by the consumer via refs/`FormData`.
- Wire accessibility relationships explicitly: `id`/`htmlFor`, `aria-describedby` (description +
  error), `fieldset`/`legend` for groups, shared `name` for radios. Use `useId()` for generated
  ids (id generation is not state).
- Forward a ref to the primary interactive element (e.g. FormField → its control, Select → the
  `<select>`).
- Same file set and token/CSS-module rules as atoms (see `src/atoms/CLAUDE.md`).
- Tests: unit tests co-located. An integration test in `tests/integration/` only when composition
  itself is the risk (e.g. FormField + Select submitting via FormData).
