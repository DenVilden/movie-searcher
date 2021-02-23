import Tv from '../pages/tv/[id]';
import { GetTvShowInfoDocument } from '../__generated__';
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
      query: GetTvShowInfoDocument,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        tvShowInfo: {
          id: 1,
          backdrop_path: null,
          poster_path: null,
          title: 'rendered tv',
          overview: 'overview',
          number_of_episodes: 30,
          number_of_seasons: 5,
          vote_average: 10,
          release_date: '2002',
          media_type: 'tv',
          similar: {
            results: [
              {
                id: 2,
                title: 'rendered similar',
                release_date: '2002',
                poster_path: null,
                media_type: 'tv',
              },
            ],
          },
        },
      },
    },
  },
];

describe('tv', () => {
  it('should fetch tv by id', async () => {
    renderApollo(<Tv />, { mocks });

    expect(await screen.findByText('rendered tv')).toBeInTheDocument();
    expect(await screen.findByText('rendered similar')).toBeInTheDocument();
  });

  it('should render error state', async () => {
    const mock = [
      {
        request: {
          query: GetTvShowInfoDocument,
          variables: {
            id: '1',
          },
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<Tv />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
