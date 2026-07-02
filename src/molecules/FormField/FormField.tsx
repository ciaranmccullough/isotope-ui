import { cloneElement, forwardRef, useId } from 'react';
import type { Ref } from 'react';
import type { FormFieldControlProps, FormFieldProps } from './FormField.types';
import styles from './FormField.module.css';

function assignRef<T>(target: Ref<T> | null | undefined, node: T | null): void {
  if (typeof target === 'function') {
    target(node);
  } else if (target) {
    (target as { current: T | null }).current = node;
  }
}

/**
 * The accessibility-wiring molecule: `<label>` + exactly one form control + optional description
 * and error text, all associated through ids so the platform (not ARIA hacks) does the work.
 *
 * - The control keeps its uncontrolled behavior; FormField only injects wiring props via
 *   `cloneElement`: `id`, `aria-describedby` (only the paragraphs that render), `aria-invalid`
 *   while `error` is set, and `required`. Library controls (Input, Select) style
 *   `[aria-invalid='true']` in their own CSS, so the injected attribute alone produces the
 *   critical border — no component-identity checks needed.
 * - Props the consumer set on the child win over the injected ones — except `id`, which
 *   FormField owns because the label/description/error wiring derives from it.
 * - `required` is handled the platform way: the native attribute goes to the control (screen
 *   readers announce "required") and the label shows an `aria-hidden` asterisk, so the
 *   accessible name stays clean.
 * - The error paragraph has NO `role="alert"`: FormField is a dumb component and cannot know
 *   when an error is "new"; the consumer decides announcement policy (live region, focus move…).
 * - The ref forwards into the control element — never the wrapper `<div>` — merged with any ref
 *   the consumer already put on the child.
 */
export const FormField = forwardRef<HTMLElement, FormFieldProps>(function FormField(
  { label, description, error, required = false, id, className, children, ...rest },
  ref,
) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;

  const childProps = children.props;

  // React 19 exposes an element's ref on props; React 18 kept it on the element object.
  const childRef =
    childProps.ref ?? (children as unknown as { ref?: Ref<HTMLElement> | null }).ref ?? null;

  const setRefs = (node: HTMLElement | null): void => {
    assignRef(childRef, node);
    assignRef(ref, node);
  };

  // Reference only the paragraphs that actually render.
  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  // Injected wiring. Every prop yields to one the consumer set on the child, except `id`.
  const injected: FormFieldControlProps = { id: controlId, ref: setRefs };
  if (describedBy && childProps['aria-describedby'] === undefined) {
    injected['aria-describedby'] = describedBy;
  }
  if (error && childProps['aria-invalid'] === undefined) {
    injected['aria-invalid'] = true;
  }
  if (required && childProps.required === undefined) {
    injected.required = true;
  }
  const classes = [styles.field, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <label className={styles.label} htmlFor={controlId}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.asterisk}>
            *
          </span>
        )}
      </label>
      {cloneElement(children, injected)}
      {description && (
        <p className={styles.description} id={descriptionId}>
          {description}
        </p>
      )}
      {error && (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});
