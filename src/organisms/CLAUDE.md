# organisms — rules

An organism composes molecules/atoms into a complete, distinct UI region.

- No business logic, no data fetching, no internal state. Visibility/open state is prop- or
  ref-driven (`Dialog` exposes the native `<dialog>` via ref; the consumer calls
  `showModal()`/`close()` or uses the declarative `open` prop).
- Queue/collection state (e.g. toasts) lives with the consumer; the organism renders what it is
  given and reports events via callbacks.
- Prefer platform primitives over re-implementation: `<dialog>` gives focus trapping and
  `::backdrop`; `<table>` semantics come from real table elements; live regions via
  `role="status"`/`aria-live`.
- Layout organisms (Navbar, Footer) are slot-based: they arrange children, they don't invent
  content.
- Same file set and token/CSS-module rules as atoms/molecules.
- These are the components that earn integration tests in `tests/integration/` (Dialog
  focus/backdrop, Table-from-data, Toast stacking).
