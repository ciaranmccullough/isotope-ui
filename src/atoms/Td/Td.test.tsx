import { createRef, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Td } from './Td';
import type { TdAlign } from './Td.types';

const aligns: TdAlign[] = ['start', 'center', 'end'];

function renderRow(cells: ReactNode) {
  return render(
    <table>
      <tbody>
        <tr>{cells}</tr>
      </tbody>
    </table>,
  );
}

describe('Td', () => {
  it('renders a native cell with its accessible name', () => {
    renderRow(<Td>Carbon-14</Td>);
    expect(screen.getByRole('cell', { name: 'Carbon-14' })).toBeInTheDocument();
  });

  it.each(aligns)('renders the %s alignment', (align) => {
    renderRow(<Td align={align}>{`align-${align}`}</Td>);
    expect(screen.getByRole('cell', { name: `align-${align}` })).toBeInTheDocument();
  });

  it('renders a numeric cell, including alongside an explicit align', () => {
    renderRow(
      <>
        <Td numeric>5,730</Td>
        <Td align="center" numeric>
          30.05
        </Td>
      </>,
    );
    expect(screen.getByRole('cell', { name: '5,730' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '30.05' })).toBeInTheDocument();
  });

  it('forwards its ref to the native td element', () => {
    const ref = createRef<HTMLTableCellElement>();
    renderRow(<Td ref={ref}>Carbon-14</Td>);
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    expect(ref.current).toHaveTextContent('Carbon-14');
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    renderRow(<Td onClick={onClick}>Carbon-14</Td>);
    await user.click(screen.getByRole('cell', { name: 'Carbon-14' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <table>
        <caption>Isotope half-lives</caption>
        <thead>
          <tr>
            <th scope="col">Isotope</th>
            <th scope="col">Half-life (years)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>Carbon-14</Td>
            <Td numeric>5,730</Td>
          </tr>
          <tr>
            <Td align="center">Caesium-137</Td>
            <Td align="end">30.05</Td>
          </tr>
        </tbody>
      </table>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
