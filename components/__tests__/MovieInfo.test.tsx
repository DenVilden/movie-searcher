import { renderApollo, fireEvent, screen } from 'utils/setupTests';
import MovieInfo from '../MovieInfo';

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

describe('movieInfo', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<MovieInfo data={mock} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should toggle favorites', () => {
    renderApollo(<MovieInfo data={mock} />);

    const addButton = screen.getByText('Add to favorites');

    fireEvent.click(addButton);

    expect(screen.getByText('Remove from favorites')).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(addButton).toBeInTheDocument();
  });
});
