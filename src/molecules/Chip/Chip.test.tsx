import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Chip } from './Chip';
import type { ChipTone } from './Chip.types';

const tones: ChipTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];

describe('Chip', () => {
  it('renders its children as the chip label', () => {
    render(<Chip>Screening</Chip>);
    expect(screen.getByText('Screening')).toBeInTheDocument();
  });

  it.each(tones)('renders the %s tone', (tone) => {
    render(<Chip tone={tone}>{tone}</Chip>);
    expect(screen.getByText(tone)).toBeInTheDocument();
  });

  it('renders the status dot only when asked, and keeps it decorative', () => {
    const { rerender } = render(<Chip>Offer</Chip>);
    const chip = screen.getByText('Offer');
    expect(chip.querySelector('[aria-hidden="true"]')).toBeNull();

    rerender(<Chip dot>Offer</Chip>);
    expect(chip.querySelector('[aria-hidden="true"]')).not.toBeNull();
    // Decorative: the chip still exposes only its text to AT — no extra role, no name change.
    expect(screen.getByText('Offer')).toHaveTextContent('Offer');
  });

  it('renders no remove button unless onRemove is provided', () => {
    render(<Chip>Offer</Chip>);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('reports intent through onRemove when the remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    render(
      <Chip onRemove={onRemove} removeLabel="Remove React">
        React
      </Chip>,
    );

    await user.click(screen.getByRole('button', { name: 'Remove React' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    // Dumb component: reporting intent must not remove anything itself.
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('names the remove button "Remove" by default', () => {
    render(<Chip onRemove={() => undefined}>React</Chip>);
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('forwards its ref to the root span', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Chip ref={ref}>Screening</Chip>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveTextContent('Screening');
  });

  it('merges a consumer className and spreads native span props', () => {
    render(
      <Chip className="consumer" data-stage="offer">
        Offer
      </Chip>,
    );
    const chip = screen.getByText('Offer');
    expect(chip).toHaveClass('consumer');
    expect(chip).toHaveAttribute('data-stage', 'offer');
  });

  it('has no axe violations across all tones, fully loaded', async () => {
    const { container } = render(
      <>
        {tones.map((tone) => (
          <Chip
            key={tone}
            dot
            tone={tone}
            onRemove={() => undefined}
            removeLabel={`Remove ${tone}`}
          >
            {tone}
          </Chip>
        ))}
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
