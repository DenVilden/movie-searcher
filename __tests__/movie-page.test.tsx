import MoviePage from '../pages/movie/[id]';
import { GetMovieInfoDocument } from '../__generated__';
import { renderApollo, screen } from '../lib/setupTests';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      id: '1',
    },
  }),
}));

const mocks = [
  {
    request: {
      query: GetMovieInfoDocument,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        movieInfo: {
          id: 1,
          backdrop_path: null,
          poster_path: null,
          title: 'rendered movie',
          overview: 'overview',
          budget: '200',
          revenue: '300',
          vote_average: 10,
          release_date: '2002',
          media_type: 'movie',
          similar: {
            results: [
              {
                id: 2,
                title: 'rendered similar',
                release_date: '2002',
                poster_path: null,
                media_type: 'movie',
              },
            ],
          },
        },
      },
    },
  },
];

describe('movie page', () => {
  it('should fetch movie by id', async () => {
    renderApollo(<MoviePage />, { mocks });

    expect(await screen.findByText('rendered movie')).toBeInTheDocument();
    expect(await screen.findByText('rendered similar')).toBeInTheDocument();
  });

  it('should render error state', async () => {
    const mock = [
      {
        request: {
          query: GetMovieInfoDocument,
          variables: {
            id: '1',
          },
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<MoviePage />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
