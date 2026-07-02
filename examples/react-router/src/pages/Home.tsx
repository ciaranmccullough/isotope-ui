import { Text } from 'isotope-ui';

export function Home() {
  return (
    <>
      <Text as="h1" size="3xl" weight="bold">
        isotope-ui × React Router
      </Text>
      <Text tone="secondary">
        The navbar links are React Router links wearing isotope-ui styling via `asChild`.
      </Text>
    </>
  );
}
