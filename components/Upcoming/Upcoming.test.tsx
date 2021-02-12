import Upcoming from './Upcoming';
import { renderApollo } from '../../utils/setupTests';

const mocks = {
  upcoming: {
    total_pages: 20,
    page: 1,
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

describe('upcoming', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<Upcoming initialData={mocks} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });
});
