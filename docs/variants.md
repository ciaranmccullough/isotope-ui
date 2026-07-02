# Variant contract

Variants are structured, typed, and token-mapped — never ad-hoc style props.

## The rules

1. Every variant is a **string-literal union** exported from the component's `*.types.ts`
   (e.g. `export type ButtonSize = 'sm' | 'md' | 'lg'`).
2. Each variant value maps to a **class in the component's `*.module.css`**, and that class only
   sets `var(--iso-*)` tokens.
3. Variant names are shared vocabulary across the library:
   - `size` — physical scale: `'sm' | 'md' | 'lg'` (extend only with tokens to back it).
   - `tone` — semantic color intent: `'neutral' | 'accent' | 'positive' | 'critical' | 'caution'`.
   - `emphasis` — visual weight of the tone: `'solid' | 'subtle' | 'outline' | 'ghost'`.
4. Defaults are documented in the component's `CLAUDE.md` and applied via prop defaults, not CSS.
5. Adding a variant value = adding tokens for it + a story + a test. No orphan variants.

## Example

```tsx
<Button tone="critical" emphasis="outline" size="sm">
  Delete
</Button>
```

maps to `.tone-critical.emphasis-outline.size-sm`, whose declarations read only
`--iso-color-critical-*`, `--iso-size-control-sm`, `--iso-font-size-sm`, `--iso-spacing-*`.

## Why

- Consumers get autocomplete and exhaustive type checking on design decisions.
- Designers get a fixed vocabulary that maps 1:1 to tokens.
- Themes restyle every variant at once by overriding tokens — no component forks.
