import { fireEvent, screen } from '@testing-library/react';

import renderApollo from 'lib/setupTests';
import Header from '../Header';

describe('header', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<Header />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should toggle theme and save to local storage', async () => {
    renderApollo(<Header />);

    const button = screen.getByLabelText(/theme switch/i);

    fireEvent.click(button);

    expect(await JSON.parse(localStorage.getItem('darkMode') as string)).toBe(
      true,
    );
  });
});
