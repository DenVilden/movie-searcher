import MovieInfo from './MovieInfo';
import { renderApollo, screen, fireEvent } from '../../lib/setupTests';

const mocks = {
  movieInfo: {
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
  },
};

describe('movieInfo', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<MovieInfo data={mocks} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should toggle favorites', () => {
    renderApollo(<MovieInfo data={mocks} />);

    const addButton = screen.getByText('Add to favorites');

    fireEvent.click(addButton);

    expect(screen.getByText('Remove from favorites')).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(addButton).toBeInTheDocument();
  });
});
