import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ListItem } from './ListItem';
import type { ListItemMarker } from './ListItem.types';

const markers: ListItemMarker[] = ['inherit', 'none'];

describe('ListItem', () => {
  it('renders a native listitem with its content inside a list', () => {
    render(
      <ul>
        <ListItem>Alpha</ListItem>
      </ul>,
    );
    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('Alpha');
  });

  it.each(markers)('renders the %s marker variant as a listitem', (marker) => {
    render(
      <ul>
        <ListItem marker={marker}>{marker}</ListItem>
      </ul>,
    );
    expect(screen.getByRole('listitem')).toHaveTextContent(marker);
  });

  it('forwards its ref to the native li element', () => {
    const ref = createRef<HTMLLIElement>();
    render(
      <ul>
        <ListItem ref={ref}>Alpha</ListItem>
      </ul>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toHaveTextContent('Alpha');
  });

  it('fires onClick when activated', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <ul>
        <ListItem onClick={onClick}>Alpha</ListItem>
      </ul>,
    );
    await user.click(screen.getByRole('listitem'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <ul>
        <ListItem>Default</ListItem>
        <ListItem marker="none">Marker none</ListItem>
      </ul>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
