import { forwardRef } from 'react';
import type { TbodyProps, TfootProps, TheadProps } from './TableSection.types';
import styles from './TableSection.module.css';

/*
 * Thead / Tbody / Tfoot — the three native table row-group sections, shipped together because
 * they are one semantic unit (see CLAUDE.md). Each renders exactly its bare native element and
 * composes nothing; rows and cells (Tr/Th/Td atoms) are supplied by the consumer as children.
 */

/**
 * Native `<thead>` row group. Adds the sunken-surface header background — its `Th` cells already
 * style themselves. Ref forwards to the `<thead>` (`HTMLTableSectionElement`).
 */
export const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(function Thead(
  { className, ...rest },
  ref,
) {
  const classes = [styles.thead, className].filter(Boolean).join(' ');

  return <thead ref={ref} className={classes} {...rest} />;
});

/**
 * Native `<tbody>` row group. Deliberately styles nothing — zebra striping and row treatments
 * belong to the Table organism. Ref forwards to the `<tbody>` (`HTMLTableSectionElement`).
 */
export const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(function Tbody(props, ref) {
  return <tbody ref={ref} {...props} />;
});

/**
 * Native `<tfoot>` row group. Adds the sunken-surface background, medium weight for summary
 * rows, and a strong top rule separating totals from data (visible when the composing table
 * sets `border-collapse: collapse`). Ref forwards to the `<tfoot>` (`HTMLTableSectionElement`).
 */
export const Tfoot = forwardRef<HTMLTableSectionElement, TfootProps>(function Tfoot(
  { className, ...rest },
  ref,
) {
  const classes = [styles.tfoot, className].filter(Boolean).join(' ');

  return <tfoot ref={ref} className={classes} {...rest} />;
});
