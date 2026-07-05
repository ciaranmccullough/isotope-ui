---
'isotope-ui': patch
---

**FormField** now reads a child's existing ref from the location the running React major uses —
`props.ref` on React 19, `element.ref` on React 18 and earlier — so merging a consumer-set child
ref no longer trips React 18.3's "ref is not a prop" dev warning. Behaviour is unchanged.
