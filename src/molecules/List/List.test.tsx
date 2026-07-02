import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ListItem } from '../../atoms/ListItem';
import { List } from './List';
import type { ListDirection, ListGap, ListMarker } from './List.types';

const directions: ListDirection[] = ['vertical', 'horizontal'];
const gaps: ListGap[] = ['0', '1', '2', '3', '4', '6', '8'];
const markers: ListMarker[] = ['none', 'inherit'];

describe('List', () => {
  it('renders an unordered list by default with accessible listitem children', () => {
    render(
      <List>
        <li>Alpha</li>
        <li>Beta</li>
      </List>,
    );
    const list = screen.getByRole('list');
    expect(list).toBeInstanceOf(HTMLUListElement);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Alpha');
    expect(items[1]).toHaveTextContent('Beta');
  });

  it('renders an ordered list when as="ol"', () => {
    render(
      <List as="ol">
        <li>Step one</li>
        <li>Step two</li>
      </List>,
    );
    const list = screen.getByRole('list');
    expect(list).toBeInstanceOf(HTMLOListElement);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('composes consumer-provided ListItem atoms without cloning', () => {
    render(
      <List>
        <ListItem>Menu entry</ListItem>
      </List>,
    );
    expect(screen.getByRole('listitem')).toHaveTextContent('Menu entry');
  });

  it.each(markers)('exposes the list role with marker="%s"', (marker) => {
    render(
      <List marker={marker}>
        <li>{marker}</li>
      </List>,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveTextContent(marker);
  });

  it('restores explicit list semantics when markers are removed (Safari/VoiceOver quirk)', () => {
    render(
      <List>
        <li>Alpha</li>
      </List>,
    );
    expect(screen.getByRole('list')).toHaveAttribute('role', 'list');
  });

  it('adds no ARIA when native markers are kept', () => {
    render(
      <List marker="inherit">
        <li>Alpha</li>
      </List>,
    );
    expect(screen.getByRole('list')).not.toHaveAttribute('role');
  });

  it.each(directions)(
    'renders the %s direction with every gap, wrapped and unwrapped',
    (direction) => {
      for (const gap of gaps) {
        for (const wrap of [false, true]) {
          const name = `${direction}-${gap}-${wrap ? 'wrap' : 'nowrap'}`;
          const { unmount } = render(
            <List direction={direction} gap={gap} wrap={wrap}>
              <li>{name}</li>
            </List>,
          );
          expect(screen.getByRole('list')).toBeInTheDocument();
          expect(screen.getByRole('listitem')).toHaveTextContent(name);
          unmount();
        }
      }
    },
  );

  it('applies start and reversed to an ordered list', () => {
    render(
      <List as="ol" start={3} reversed>
        <li>Three</li>
        <li>Two</li>
        <li>One</li>
      </List>,
    );
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('start', '3');
    expect(list).toHaveAttribute('reversed');
  });

  it('drops start and reversed on an unordered list instead of rendering invalid attributes', () => {
    render(
      <List start={3} reversed>
        <li>Alpha</li>
      </List>,
    );
    const list = screen.getByRole('list');
    expect(list).not.toHaveAttribute('start');
    expect(list).not.toHaveAttribute('reversed');
  });

  it('forwards its ref to the native ul element', () => {
    const ref = createRef<HTMLUListElement | HTMLOListElement>();
    render(
      <List ref={ref}>
        <li>Alpha</li>
      </List>,
    );
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it('forwards its ref to the native ol element', () => {
    const ref = createRef<HTMLUListElement | HTMLOListElement>();
    render(
      <List as="ol" ref={ref}>
        <li>Alpha</li>
      </List>,
    );
    expect(ref.current).toBeInstanceOf(HTMLOListElement);
  });

  it('merges the consumer className with its own classes', () => {
    render(
      <List className="consumer-class">
        <li>Alpha</li>
      </List>,
    );
    expect(screen.getByRole('list')).toHaveClass('consumer-class');
  });

  it('fires onClick when activated', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <List onClick={onClick}>
        <li>Alpha</li>
      </List>,
    );
    await user.click(screen.getByRole('list'));
    expect(onClick).toHaveBeenCalled();
  });

  it('has no axe violations as ul or ol, with and without markers', async () => {
    const { container } = render(
      <>
        <List>
          <li>Default ul</li>
        </List>
        <List marker="inherit">
          <li>Marked ul</li>
        </List>
        <List as="ol" direction="horizontal" gap="4" wrap>
          <li>Default ol</li>
        </List>
        <List as="ol" marker="inherit" start={2} reversed>
          <li>Marked ol</li>
        </List>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
