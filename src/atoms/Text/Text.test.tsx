import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Text } from './Text';
import type { TextAlign, TextElement, TextSize, TextTone, TextWeight } from './Text.types';

const elements: TextElement[] = [
  'p',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'em',
  'small',
  'label',
];
const sizes: TextSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const weights: TextWeight[] = ['regular', 'medium', 'semibold', 'bold'];
const tones: TextTone[] = ['default', 'secondary', 'muted', 'disabled', 'inverse'];
const aligns: TextAlign[] = ['start', 'center', 'end'];

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Body copy</Text>);
    expect(screen.getByRole('paragraph')).toHaveTextContent('Body copy');
  });

  it('renders headings with the correct level and accessible name', () => {
    render(
      <Text as="h2" size="sm">
        Section title
      </Text>,
    );
    expect(screen.getByRole('heading', { name: 'Section title', level: 2 })).toBeInTheDocument();
  });

  it.each(elements)('renders the %s element via the as prop', (as) => {
    const ref = createRef<HTMLElement>();
    render(
      <Text as={as} ref={ref}>
        content
      </Text>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName.toLowerCase()).toBe(as);
    expect(ref.current).toHaveTextContent('content');
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(<Text size={size}>{`size-${size}`}</Text>);
    expect(screen.getByText(`size-${size}`)).toBeInTheDocument();
  });

  it.each(weights)('renders the %s weight', (weight) => {
    render(<Text weight={weight}>{`weight-${weight}`}</Text>);
    expect(screen.getByText(`weight-${weight}`)).toBeInTheDocument();
  });

  it.each(tones)('renders the %s tone', (tone) => {
    render(<Text tone={tone}>{`tone-${tone}`}</Text>);
    expect(screen.getByText(`tone-${tone}`)).toBeInTheDocument();
  });

  it.each(aligns)('renders the %s alignment', (align) => {
    render(<Text align={align}>{`align-${align}`}</Text>);
    expect(screen.getByText(`align-${align}`)).toBeInTheDocument();
  });

  it('renders truncated text without losing its content', () => {
    render(<Text truncate>A very long single line</Text>);
    expect(screen.getByText('A very long single line')).toBeInTheDocument();
  });

  it('forwards its ref to the native element', () => {
    const ref = createRef<HTMLElement>();
    render(<Text ref={ref}>Referenced</Text>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current).toHaveTextContent('Referenced');
  });

  it('merges a consumer className with its own classes', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text ref={ref} className="consumer-class">
        Styled
      </Text>,
    );
    expect(ref.current).toHaveClass('consumer-class');
  });

  it('fires onClick when activated', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Text onClick={onClick}>Clickable</Text>);
    await user.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Text as="h1" size="3xl" weight="bold">
          Page title
        </Text>
        <Text as="h2" size="xl" weight="semibold">
          Section
        </Text>
        <Text>Default paragraph</Text>
        <Text tone="secondary" size="sm">
          Secondary small print
        </Text>
        <Text as="span" tone="muted" align="center" truncate>
          Muted centered truncated span
        </Text>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
