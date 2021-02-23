import Home from '../pages';
import { GetMoviesDocument } from '../__generated__';
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
      query: GetMoviesDocument,
    },
    result: {
      data: {
        nowPlaying: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'now playing rendered',
              vote_average: 5,
              poster_path: null,
            },
          ],
        },
        upcoming: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'upcoming rendered',
              release_date: '2002',
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe('home', () => {
  it('should fetch initial movies', async () => {
    renderApollo(<Home />, { mocks });

    expect(await screen.findByText('upcoming rendered')).toBeInTheDocument();
    expect(await screen.findByText('now playing rendered')).toBeInTheDocument();
  });

  it('should render error state', async () => {
    const mock = [
      {
        request: {
          query: GetMoviesDocument,
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<Home />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
