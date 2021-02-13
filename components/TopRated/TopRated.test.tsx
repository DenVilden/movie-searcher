import TopRated from './TopRated';
import { renderApollo } from '../../lib/setupTests';

const mocks = {
  topRated: {
    total_pages: 20,
    page: 1,
    results: [
      {
        id: 1,
        title: 'test',
        release_date: '2020',
        poster_path: null,
        vote_average: 10,
      },
    ],
  },
};

describe('topRated', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<TopRated initialData={mocks} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
