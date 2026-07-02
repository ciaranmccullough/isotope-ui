import { useState } from 'react';
import {
  Button,
  Counter,
  FormField,
  Input,
  RadioButton,
  RadioGroup,
  Select,
  Text,
} from 'isotope-ui';

/**
 * Uncontrolled-forms proof: no value props, no onChange state syncing — the DOM holds the
 * values and FormData reads them on submit. The only state is the submitted result (app land).
 */
export function SignupPage() {
  const [result, setResult] = useState<string>();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setResult(JSON.stringify(Object.fromEntries(data), null, 2));
      }}
      style={{
        display: 'grid',
        gap: 'var(--iso-spacing-4)',
        maxWidth: 'var(--iso-size-container-xs)',
      }}
    >
      <Text as="h1" size="2xl" weight="bold">
        Sign up
      </Text>
      <FormField label="Email" description="Work email preferred.">
        <Input name="email" type="email" required />
      </FormField>
      <FormField label="Team size">
        <Select name="teamSize" defaultValue="2-10">
          <option value="1">Just me</option>
          <option value="2-10">2–10</option>
          <option value="11+">11+</option>
        </Select>
      </FormField>
      <RadioGroup legend="Plan" name="plan">
        <RadioButton value="free" defaultChecked>
          Free
        </RadioButton>
        <RadioButton value="pro">Pro</RadioButton>
      </RadioGroup>
      <FormField label="Seats">
        <Counter name="seats" defaultValue={1} min={1} max={99} />
      </FormField>
      <Button type="submit" tone="accent">
        Create account
      </Button>
      {result && (
        <pre style={{ fontFamily: 'var(--iso-font-family-mono)' }}>
          <Text as="span" size="sm">
            {result}
          </Text>
        </pre>
      )}
    </form>
  );
}
