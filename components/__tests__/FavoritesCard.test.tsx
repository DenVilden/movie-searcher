import renderApollo from 'lib/setupTests';
import FavoritesCard from '../FavoritesCard';

const mock = {
  backdrop_path: null,
  budget: '0',
  id: 1,
  media_type: 'movie',
  overview: 'test data',
  poster_path: null,
  release_date: '2020',
  revenue: '0',
  similar: {
    results: [
      {
        id: 1,
        media_type: 'movie',
        poster_path: null,
        release_date: '2020',
        title: 'test',
      },
    ],
  },
  title: 'test',
  vote_average: 5,
};

describe('favoritesCard', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <FavoritesCard favorite={mock} handleToggle={jest.fn()} />,
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
