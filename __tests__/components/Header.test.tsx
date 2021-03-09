import { renderApollo, fireEvent, screen } from 'lib/setupTests';
import Header from 'components/Header';

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