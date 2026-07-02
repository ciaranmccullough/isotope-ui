import type { ComponentPropsWithoutRef } from 'react';

// Three prop types, one file: Thead/Tbody/Tfoot are one semantic unit (see CLAUDE.md). They are
// semantic wrappers with no variants, so each type is exactly its native element's props.

/** Props for `Thead` — the native `<thead>` props, untouched. No variants. */
export type TheadProps = ComponentPropsWithoutRef<'thead'>;

/** Props for `Tbody` — the native `<tbody>` props, untouched. No variants. */
export type TbodyProps = ComponentPropsWithoutRef<'tbody'>;

/** Props for `Tfoot` — the native `<tfoot>` props, untouched. No variants. */
export type TfootProps = ComponentPropsWithoutRef<'tfoot'>;
