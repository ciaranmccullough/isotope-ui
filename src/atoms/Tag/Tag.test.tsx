import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Tag } from './Tag';
import type { TagTone } from './Tag.types';

const tones: TagTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];

describe('Tag', () => {
  it('renders its children as plain inline text', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('exposes no role — the text is the semantics', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React').tagName).toBe('SPAN');
  });

  it.each(tones)('renders the %s tone', (tone) => {
    render(<Tag tone={tone}>{tone}</Tag>);
    expect(screen.getByText(tone)).toBeInTheDocument();
  });

  it('forwards its ref to the native span', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>React</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveTextContent('React');
  });

  it('merges a consumer className and spreads native span props', () => {
    render(
      <Tag className="consumer" data-kind="skill" title="Skill tag">
        React
      </Tag>,
    );
    const tag = screen.getByText('React');
    expect(tag).toHaveClass('consumer');
    expect(tag).toHaveAttribute('data-kind', 'skill');
    expect(tag).toHaveAttribute('title', 'Skill tag');
  });

  it('has no axe violations across all tones', async () => {
    const { container } = render(
      <>
        {tones.map((tone) => (
          <Tag key={tone} tone={tone}>
            {tone}
          </Tag>
        ))}
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
