import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ToastRegion } from './ToastRegion';
import { Toast } from '../../molecules/Toast';
import type { ToastRegionPlacement } from './ToastRegion.types';

const placements: ToastRegionPlacement[] = ['top-start', 'top-end', 'bottom-start', 'bottom-end'];

describe('ToastRegion', () => {
  it('is a region landmark named "Notifications" by default', () => {
    render(<ToastRegion />);
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('accepts a custom label', () => {
    render(<ToastRegion label="Alerts" />);
    expect(screen.getByRole('region', { name: 'Alerts' })).toBeInTheDocument();
  });

  it('stacks Toast children, each keeping its own live-region role', () => {
    render(
      <ToastRegion>
        <Toast title="Saved" tone="positive" />
        <Toast title="Sync failed" tone="critical" role="alert" />
      </ToastRegion>,
    );
    const region = screen.getByRole('region', { name: 'Notifications' });
    expect(within(region).getByRole('status')).toBeInTheDocument();
    expect(within(region).getByRole('alert')).toBeInTheDocument();
  });

  it('reflects consumer queue changes on re-render', () => {
    const { rerender } = render(
      <ToastRegion>
        <Toast key="a" title="First" />
        <Toast key="b" title="Second" />
      </ToastRegion>,
    );
    expect(screen.getAllByRole('status')).toHaveLength(2);
    rerender(
      <ToastRegion>
        <Toast key="b" title="Second" />
      </ToastRegion>,
    );
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('Second');
  });

  it.each(placements)('renders the %s placement', (placement) => {
    render(<ToastRegion placement={placement} label={placement} />);
    expect(screen.getByRole('region', { name: placement })).toBeInTheDocument();
  });

  it('forwards its ref to the section element', () => {
    const ref = createRef<HTMLElement>();
    render(<ToastRegion ref={ref} />);
    expect(ref.current?.tagName).toBe('SECTION');
  });

  it('has no axe violations with stacked toasts', async () => {
    const { container } = render(
      <ToastRegion>
        <Toast title="Saved" tone="positive" onDismiss={() => undefined} />
        <Toast title="Heads up" tone="caution" />
      </ToastRegion>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
