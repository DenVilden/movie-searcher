import Header from './Header';
import { renderApollo } from '../../utils/setupTests';

const mock = {
  id: 1,
  backdrop_path: null,
  poster_path: null,
  title: 'test',
  overview: 'test data',
  budget: '0',
  revenue: '0',
  vote_average: 5,
  release_date: '2020',
  similar: {
    results: [
      {
        id: 1,
        title: 'test',
        release_date: '2020',
        poster_path: null,
      },
    ],
  },
};

describe('header', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<Header />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should set initial favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mock]));

    const { getByText } = renderApollo(<Header />);

    expect(getByText('1')).toBeTruthy();
  });
});
