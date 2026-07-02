import type { AriaAttributes, ComponentPropsWithoutRef, ReactElement, Ref } from 'react';

/**
 * The props FormField may inject into its single control child via `cloneElement`. Any control
 * that accepts these (the library Input, Select, Counter, native `<input>`/`<select>`/
 * `<textarea>`…) is a valid child. Only `aria-invalid` is injected on error — the library
 * Input and Select style `[aria-invalid='true']` themselves, so no `invalid` prop injection
 * (or component-identity check) is needed. `invalid` remains in this surface for consumers
 * composing their own wiring.
 */
export interface FormFieldControlProps {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  required?: boolean;
  /** Library-Input-only convenience (critical border); see FormField's CLAUDE.md. */
  invalid?: boolean;
  ref?: Ref<HTMLElement>;
}

export interface FormFieldProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'id'> {
  /** Visible label text, associated with the control via native `htmlFor`. */
  label: string;
  /** Optional hint rendered below the control and referenced from `aria-describedby`. */
  description?: string;
  /**
   * Error text (critical tone) referenced from `aria-describedby`; also sets `aria-invalid` on
   * the control. Deliberately not `role="alert"` — the consumer owns announcement policy.
   */
  error?: string;
  /**
   * Marks the field required the platform way: the native `required` attribute is passed to the
   * control (screen readers announce it) and an `aria-hidden` asterisk is shown in the label.
   * @default false
   */
  required?: boolean;
  /**
   * Id for the **control** (not the wrapper). The label `htmlFor` and the description/error ids
   * derive from it. Generated with `useId()` when omitted. FormField owns id wiring — an `id`
   * set directly on the child is overridden.
   */
  id?: string;
  /** Exactly one form control element; FormField wires it up via `cloneElement`. */
  children: ReactElement<FormFieldControlProps>;
}
