import MovieInfo from '../MovieInfo';
import { renderApollo, screen, fireEvent } from '../../lib/setupTests';

const mocks = [
  {
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
  },
  {
    backdrop_path: null,
    id: 1,
    media_type: 'tv',
    number_of_episodes: 5,
    number_of_seasons: 1,
    overview: 'test data',
    poster_path: null,
    release_date: '2020',
    similar: {
      results: [
        {
          id: 1,
          media_type: 'tv',
          poster_path: null,
          release_date: '2020',
          title: 'test',
        },
      ],
    },
    title: 'test',
    vote_average: 5,
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
