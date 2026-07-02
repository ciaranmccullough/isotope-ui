import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tr } from './Tr';

describe('Tr', () => {
  it('renders a table row named by its cell content', () => {
    render(
      <table>
        <tbody>
          <Tr>
            <td>Carbon-14</td>
            <td>5,730 years</td>
          </Tr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole('row', { name: 'Carbon-14 5,730 years' })).toBeInTheDocument();
  });

  it('does not render aria-selected when the selected prop is unset', () => {
    render(
      <table>
        <tbody>
          <Tr>
            <td>Carbon-14</td>
          </Tr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole('row', { name: 'Carbon-14' })).not.toHaveAttribute('aria-selected');
  });

  it('selected renders the row with aria-selected="true"', () => {
    render(
      <table>
        <tbody>
          <Tr selected>
            <td>Carbon-14</td>
          </Tr>
        </tbody>
      </table>,
    );
    const row = screen.getByRole('row', { name: 'Carbon-14', selected: true });
    expect(row).toBeInTheDocument();
    expect(row).toHaveAttribute('aria-selected', 'true');
  });

  it('selected={false} opts in with aria-selected="false"', () => {
    render(
      <table>
        <tbody>
          <Tr selected={false}>
            <td>Carbon-14</td>
          </Tr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole('row', { name: 'Carbon-14', selected: false })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('interactive renders the row', () => {
    render(
      <table>
        <tbody>
          <Tr interactive>
            <td>Carbon-14</td>
          </Tr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole('row', { name: 'Carbon-14' })).toBeInTheDocument();
  });

  it('forwards its ref to the native tr element', () => {
    const ref = createRef<HTMLTableRowElement>();
    render(
      <table>
        <tbody>
          <Tr ref={ref}>
            <td>Carbon-14</td>
          </Tr>
        </tbody>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
    expect(ref.current).toHaveTextContent('Carbon-14');
  });

  it('fires onClick when the row is clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <table>
        <tbody>
          <Tr interactive onClick={onClick}>
            <td>Carbon-14</td>
          </Tr>
        </tbody>
      </table>,
    );
    await user.click(screen.getByRole('row', { name: 'Carbon-14' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations in plain and grid tables', async () => {
    const { container } = render(
      <>
        <table>
          <thead>
            <Tr>
              <th scope="col">Isotope</th>
              <th scope="col">Half-life</th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <td>Carbon-14</td>
              <td>5,730 years</td>
            </Tr>
            <Tr interactive>
              <td>Uranium-238</td>
              <td>4.5 billion years</td>
            </Tr>
          </tbody>
        </table>
        <table role="grid" aria-label="Select an isotope">
          <thead>
            <Tr>
              <th scope="col">Isotope</th>
              <th scope="col">Half-life</th>
            </Tr>
          </thead>
          <tbody>
            <Tr interactive selected>
              <td>Iodine-131</td>
              <td>8 days</td>
            </Tr>
            <Tr interactive selected={false}>
              <td>Tritium</td>
              <td>12.3 years</td>
            </Tr>
          </tbody>
        </table>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
