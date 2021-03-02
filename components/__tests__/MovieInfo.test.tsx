import MovieInfo from '../MovieInfo';
import { renderApollo, screen, fireEvent } from '../../lib/setupTests';

const mocks = [
  {
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
  },
  {
    id: 1,
    backdrop_path: null,
    poster_path: null,
    title: 'test',
    overview: 'test data',
    number_of_episodes: 5,
    number_of_seasons: 1,
    vote_average: 5,
    release_date: '2020',
    media_type: 'tv',
    similar: {
      results: [
        {
          id: 1,
          title: 'test',
          release_date: '2020',
          poster_path: null,
          media_type: 'tv',
        },
      ],
    },
  },
];

describe('movieInfo', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<MovieInfo data={mocks[1]} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should toggle favorites', () => {
    renderApollo(<MovieInfo data={mocks[0]} />);

    const addButton = screen.getByText('Add to favorites');

    fireEvent.click(addButton);

    expect(screen.getByText('Remove from favorites')).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(addButton).toBeInTheDocument();
  });
});
