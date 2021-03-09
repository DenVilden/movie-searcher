import { renderApollo, screen } from 'utils/setupTests';
import HomePage from 'pages';
import { GetMoviesDocument } from 'apollo/__generated__';

const mocks = [
  {
    request: {
      query: GetMoviesDocument,
    },
    result: {
      data: {
        nowPlaying: {
          page: 1,
          results: [
            {
              id: 1,
              poster_path: null,
              title: 'now playing rendered',
              vote_average: 5,
            },
          ],
          total_pages: 20,
        },
        upcoming: {
          page: 1,
          results: [
            {
              id: 1,
              poster_path: null,
              release_date: '2002',
              title: 'upcoming rendered',
            },
          ],
          total_pages: 20,
        },
      },
    },
  },
];

describe('home page', () => {
  it('should fetch initial movies', async () => {
    renderApollo(<HomePage />, { mocks });

    expect(await screen.findByText('upcoming rendered')).toBeInTheDocument();
    expect(await screen.findByText('now playing rendered')).toBeInTheDocument();
  });

  it('should render error state', async () => {
    const mock = [
      {
        error: new Error('an error has occurred'),
        request: {
          query: GetMoviesDocument,
        },
      },
    ];

    renderApollo(<HomePage />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
