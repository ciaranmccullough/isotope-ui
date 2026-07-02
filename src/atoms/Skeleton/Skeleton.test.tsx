import { createRef } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Skeleton } from './Skeleton';
import type { SkeletonShape } from './Skeleton.types';

const shapes: SkeletonShape[] = ['text', 'rect', 'circle'];

// Skeleton is decorative by definition and always aria-hidden, so it has no role or
// accessible name to query — the forwarded ref is the sanctioned handle to the element.
describe('Skeleton', () => {
  it('renders a div that is hidden from the accessibility tree', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
  });

  it('stays aria-hidden even if a consumer tries to override it', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} aria-hidden={false} />);
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
  });

  it.each(shapes)('renders the %s shape', (shape) => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} shape={shape} />);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards its ref to the native div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies width and height through inline style', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} shape="circle" width="3rem" height="3rem" />);
    expect(ref.current).toHaveStyle({ width: '3rem', height: '3rem' });
  });

  it('merges a consumer style object with the dimension props', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} width="10rem" style={{ marginTop: '1rem' }} />);
    expect(ref.current).toHaveStyle({ width: '10rem', marginTop: '1rem' });
  });

  it('has no axe violations in a composed loading card', async () => {
    const { container } = render(
      <section aria-busy="true" aria-label="Loading article">
        <Skeleton shape="circle" width="3rem" />
        <div>
          <Skeleton shape="text" width="8rem" />
          <Skeleton shape="rect" width="12rem" height="6rem" />
          <Skeleton shape="text" width="10rem" />
        </div>
      </section>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
