import { createRef } from 'react';
import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Th } from './Th';
import type { ThAlign } from './Th.types';

const aligns: ThAlign[] = ['start', 'center', 'end'];

function renderInHeaderRow(cell: ReactNode) {
  return render(
    <table>
      <thead>
        <tr>{cell}</tr>
      </thead>
    </table>,
  );
}

describe('Th', () => {
  it('renders a native th as a column header with its accessible name', () => {
    renderInHeaderRow(<Th>Name</Th>);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  });

  it('defaults scope to "col" so screen readers associate the column', () => {
    renderInHeaderRow(<Th>Name</Th>);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
  });

  it('renders as a row header with scope="row"', () => {
    render(
      <table>
        <tbody>
          <tr>
            <Th scope="row">EMEA</Th>
            <td>1,204</td>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole('rowheader', { name: 'EMEA' })).toHaveAttribute('scope', 'row');
  });

  it.each(aligns)('renders the %s alignment', (align) => {
    renderInHeaderRow(<Th align={align}>{align}</Th>);
    expect(screen.getByRole('columnheader', { name: align })).toBeInTheDocument();
  });

  it('renders a numeric header (numeric takes precedence over align)', () => {
    renderInHeaderRow(
      <Th numeric align="start">
        Revenue
      </Th>,
    );
    expect(screen.getByRole('columnheader', { name: 'Revenue' })).toBeInTheDocument();
  });

  it('forwards its ref to the native th element', () => {
    const ref = createRef<HTMLTableCellElement>();
    renderInHeaderRow(<Th ref={ref}>Name</Th>);
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    expect(ref.current).toHaveTextContent('Name');
  });

  it('fires onClick when activated (sortable-header consumers)', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    renderInHeaderRow(<Th onClick={onClick}>Name</Th>);
    await user.click(screen.getByRole('columnheader', { name: 'Name' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations in a real table with column and row headers', async () => {
    const { container } = render(
      <table>
        <caption>Quarterly revenue by region</caption>
        <thead>
          <tr>
            <Th>Region</Th>
            <Th align="center">Trend</Th>
            <Th numeric>Revenue</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Th scope="row">EMEA</Th>
            <td>Up</td>
            <td>1,204</td>
          </tr>
          <tr>
            <Th scope="row">APAC</Th>
            <td>Flat</td>
            <td>987</td>
          </tr>
        </tbody>
      </table>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
