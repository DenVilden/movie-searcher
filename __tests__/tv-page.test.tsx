import { screen } from '@testing-library/react';

import renderApollo from 'lib/setupTests';
import TvPage from 'pages/tv/[id]';
import { GetTvShowInfoDocument } from '__generated__';

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
          backdrop_path: null,
          id: 1,
          media_type: 'tv',
          number_of_episodes: 30,
          number_of_seasons: 5,
          overview: 'overview',
          poster_path: null,
          release_date: '2002',
          similar: {
            results: [
              {
                id: 2,
                media_type: 'tv',
                poster_path: null,
                release_date: '2002',
                title: 'rendered similar',
              },
            ],
          },
          title: 'rendered tv',
          vote_average: 10,
        },
      },
    },
  },
];

describe('tv page', () => {
  it('should fetch tv by id', async () => {
    renderApollo(<TvPage />, { mocks });

    expect(await screen.findByText('rendered tv')).toBeInTheDocument();
    expect(await screen.findByText('rendered similar')).toBeInTheDocument();
  });

  it('should render error state', async () => {
    const mock = [
      {
        error: new Error('an error has occurred'),
        request: {
          query: GetTvShowInfoDocument,
          variables: {
            id: '1',
          },
        },
      },
    ];

    renderApollo(<TvPage />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
