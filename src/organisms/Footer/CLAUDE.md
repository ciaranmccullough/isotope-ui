# Footer — contract

Wraps: **`<footer>`** (the contentinfo landmark at page level). Pure layout organism.

## UI model (`FooterProps` extends `ComponentPropsWithoutRef<'footer'>`)

| Prop    | Values                                                    | Default |
| ------- | --------------------------------------------------------- | ------- |
| `legal` | ReactNode — fine print (©, legal links) below the columns | —       |

`children` = the columns (compose `List` + `ListItem` + `Link` + `Text`); they wrap in a
flex row with a token gap.

## Tokens consumed

`--iso-spacing-4/6/8/10` (padding/gaps), `--iso-color-surface-sunken` (bg),
`--iso-border-width-1` + `--iso-color-border` (top rules), `--iso-color-text-secondary` /
`--iso-color-text-muted`, `--iso-font-family-sans`, `--iso-font-size-sm/xs`,
`--iso-line-height-normal`.

## Accessibility

Native `<footer>` landmark; nothing added. Column headings should be real headings (`Text
as="h2"`) so screen-reader users can navigate columns — stories model this.

## Stories / tests must cover

Contentinfo role, columns + legal slots queryable by role/text, legal-less render, ref
(FOOTER element), axe on the fully composed footer.
