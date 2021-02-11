import { renderApollo } from '../../utils/setupTests';
import MovieCard from './MovieCard';

const mock = {
  id: 1,
  poster_path: null,
  title: 'test',
  vote_average: 5,
  release_date: '2020',
};

describe('movieCard', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<MovieCard movie={mock} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
