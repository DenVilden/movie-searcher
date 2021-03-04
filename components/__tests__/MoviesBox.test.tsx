import { renderApollo } from '../../lib/setupTests';
import MoviesBox from '../MoviesBox';

const mock = [
  {
    id: 1,
    poster_path: null,
    release_date: '2020',
    title: 'test',
    vote_average: 5,
  },
];

describe('moviesBox', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <MoviesBox movies={mock} title="new" />,
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
