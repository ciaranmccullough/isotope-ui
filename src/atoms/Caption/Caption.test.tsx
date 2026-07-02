import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Caption } from './Caption';
import type { CaptionAlign, CaptionSide } from './Caption.types';

const aligns: CaptionAlign[] = ['start', 'center', 'end'];
const sides: CaptionSide[] = ['top', 'bottom'];

describe('Caption', () => {
  it('gives the table its accessible name', () => {
    render(
      <table>
        <Caption>Isotope half-lives</Caption>
        <tbody>
          <tr>
            <td>Carbon-14</td>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole('table', { name: 'Isotope half-lives' })).toBeInTheDocument();
  });

  it.each(aligns)('renders the %s alignment on both sides', (align) => {
    for (const side of sides) {
      const name = `${align}-${side}`;
      const { unmount } = render(
        <table>
          <Caption align={align} side={side}>
            {name}
          </Caption>
          <tbody>
            <tr>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>,
      );
      expect(screen.getByRole('table', { name })).toBeInTheDocument();
      unmount();
    }
  });

  it('forwards its ref to the native caption element', () => {
    const ref = createRef<HTMLTableCaptionElement>();
    render(
      <table>
        <Caption ref={ref}>Isotope half-lives</Caption>
        <tbody>
          <tr>
            <td>Carbon-14</td>
          </tr>
        </tbody>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableCaptionElement);
    expect(ref.current).toHaveTextContent('Isotope half-lives');
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <table>
        <Caption onClick={onClick}>Isotope half-lives</Caption>
        <tbody>
          <tr>
            <td>Carbon-14</td>
          </tr>
        </tbody>
      </table>,
    );
    await user.click(screen.getByRole('caption'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <table>
        <Caption align="center" side="bottom">
          Isotope half-lives
        </Caption>
        <thead>
          <tr>
            <th scope="col">Isotope</th>
            <th scope="col">Half-life</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Carbon-14</td>
            <td>5,730 years</td>
          </tr>
        </tbody>
      </table>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
