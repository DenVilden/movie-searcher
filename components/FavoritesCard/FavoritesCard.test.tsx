import { renderApollo } from '../../lib/setupTests';
import FavoritesCard from './FavoritesCard';

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
  media_type: 'movie',
  similar: {
    results: [
      {
        id: 1,
        title: 'test',
        release_date: '2020',
        poster_path: null,
        media_type: 'movie',
      },
    ],
  },
};

describe('favoritesCard', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <FavoritesCard handleToggle={jest.fn()} favorite={mock} />,
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
