import { renderApollo } from 'lib/setupTests';
import MovieCard from 'components/MovieCard';

const mock = {
  id: 1,
  media_type: 'movie',
  poster_path: null,
  release_date: '2020',
  title: 'test',
  vote_average: 5,
};

describe('movieCard', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<MovieCard movie={mock} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
