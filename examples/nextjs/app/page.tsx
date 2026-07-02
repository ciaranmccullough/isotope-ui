import { Text } from 'isotope-ui';

export default function Home() {
  return (
    <>
      <Text as="h1" size="3xl" weight="bold">
        isotope-ui × Next.js
      </Text>
      <Text tone="secondary">
        The navbar links are next/link elements wearing isotope-ui styling via `asChild`.
      </Text>
    </>
  );
}
