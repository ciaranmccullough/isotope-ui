import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Td } from '../../atoms/Td';
import { Th } from '../../atoms/Th';
import { Tr } from '../../atoms/Tr';
import { Tbody, Tfoot, Thead } from './TableSection';

function getSections(): { head: HTMLElement; body: HTMLElement; foot: HTMLElement } {
  const [head, body, foot] = screen.getAllByRole('rowgroup');
  if (!head || !body || !foot) {
    throw new Error('expected exactly three rowgroups (thead, tbody, tfoot)');
  }
  return { head, body, foot };
}

function ComposedTable() {
  return (
    <table>
      <caption>Quarterly revenue by region</caption>
      <Thead>
        <Tr>
          <Th>Region</Th>
          <Th numeric>Q1</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Th scope="row">EMEA</Th>
          <Td numeric>1,200</Td>
        </Tr>
        <Tr>
          <Th scope="row">APAC</Th>
          <Td numeric>980</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th scope="row">Total</Th>
          <Td numeric>2,180</Td>
        </Tr>
      </Tfoot>
    </table>
  );
}

describe('TableSection', () => {
  it('renders Thead, Tbody, and Tfoot as three rowgroups', () => {
    render(<ComposedTable />);
    expect(screen.getAllByRole('rowgroup')).toHaveLength(3);
  });

  it('keeps children accessible inside each section', () => {
    render(<ComposedTable />);
    const { head, body, foot } = getSections();
    expect(within(head).getByRole('columnheader', { name: 'Region' })).toBeInTheDocument();
    expect(within(head).getByRole('columnheader', { name: 'Q1' })).toBeInTheDocument();
    expect(within(body).getByRole('rowheader', { name: 'EMEA' })).toBeInTheDocument();
    expect(within(body).getByRole('cell', { name: '1,200' })).toBeInTheDocument();
    expect(within(foot).getByRole('rowheader', { name: 'Total' })).toBeInTheDocument();
    expect(within(foot).getByRole('cell', { name: '2,180' })).toBeInTheDocument();
  });

  it('forwards refs to the native table section elements', () => {
    const headRef = createRef<HTMLTableSectionElement>();
    const bodyRef = createRef<HTMLTableSectionElement>();
    const footRef = createRef<HTMLTableSectionElement>();
    render(
      <table>
        <Thead ref={headRef}>
          <Tr>
            <Th>Region</Th>
          </Tr>
        </Thead>
        <Tbody ref={bodyRef}>
          <Tr>
            <Td>EMEA</Td>
          </Tr>
        </Tbody>
        <Tfoot ref={footRef}>
          <Tr>
            <Td>Total</Td>
          </Tr>
        </Tfoot>
      </table>,
    );
    expect(headRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(headRef.current?.tagName).toBe('THEAD');
    expect(bodyRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(bodyRef.current?.tagName).toBe('TBODY');
    expect(footRef.current).toBeInstanceOf(HTMLTableSectionElement);
    expect(footRef.current?.tagName).toBe('TFOOT');
  });

  it('merges a consumer className onto each section', () => {
    render(
      <table>
        <Thead className="custom-head">
          <Tr>
            <Th>Region</Th>
          </Tr>
        </Thead>
        <Tbody className="custom-body">
          <Tr>
            <Td>EMEA</Td>
          </Tr>
        </Tbody>
        <Tfoot className="custom-foot">
          <Tr>
            <Td>Total</Td>
          </Tr>
        </Tfoot>
      </table>,
    );
    const { head, body, foot } = getSections();
    expect(head).toHaveClass('custom-head');
    expect(body).toHaveClass('custom-body');
    expect(foot).toHaveClass('custom-foot');
  });

  it('passes native DOM props through (a click inside the section bubbles to its handler)', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <table>
        <Tbody onClick={onClick}>
          <Tr>
            <Td>EMEA</Td>
          </Tr>
        </Tbody>
      </table>,
    );
    await user.click(screen.getByRole('cell', { name: 'EMEA' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations on a full composed table', async () => {
    const { container } = render(<ComposedTable />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
