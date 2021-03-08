import { screen } from '@testing-library/react';

import MoviePage from 'pages/movie/[id]';
import { GetMovieInfoDocument } from '__generated__';
import renderApollo from 'lib/setupTests';

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
          backdrop_path: null,
          budget: '200',
          id: 1,
          media_type: 'movie',
          overview: 'overview',
          poster_path: null,
          release_date: '2002',
          revenue: '300',
          similar: {
            results: [
              {
                id: 2,
                media_type: 'movie',
                poster_path: null,
                release_date: '2002',
                title: 'rendered similar',
              },
            ],
          },
          title: 'rendered movie',
          vote_average: 10,
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
        error: new Error('an error has occurred'),
        request: {
          query: GetMovieInfoDocument,
          variables: {
            id: '1',
          },
        },
      },
    ];

    renderApollo(<MoviePage />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
