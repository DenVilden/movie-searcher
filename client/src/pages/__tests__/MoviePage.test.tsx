import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import MoviePage from '../MoviePage';
import {
  GetMovieInfoDocument,
  GetFavoritesDocument,
} from '../../__generated__';
import {
  renderApollo,
  cleanup,
  waitForElement,
  fireEvent,
} from '../../setupTests';

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
          __typename: 'MovieInfo',
          isInFavorites: false,
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
            __typename: 'SimilarMovies',
            results: [
              {
                __typename: 'SimilarResults',
                id: 1,
                title: 'test',
                release_date: '2020',
                poster_path: null,
              },
            ],
          },
        },
      },
    },
  },
];

describe('MoviePage', () => {
  afterEach(cleanup);

  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetMovieInfoDocument,
          variables: {
            id: '1',
          },
        },
        error: new Error('Error'),
      },
    ];

    const { getByRole } = renderApollo(<MoviePage id="1" />, {
      mocks: mockError,
    });

    const errorElement = await waitForElement(() => getByRole(/errormessage/i));

    expect(errorElement).toHaveTextContent(/Error/i);
  });

  it('should refetch movie and toggle favorites', async () => {
    const mock = [mocks[0], mocks[0], mocks[0]];

    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: ['1'] },
    });

    const { getByTestId, getByText } = renderApollo(<MoviePage id="1" />, {
      mocks: mock,
      cache,
    });

    const favoritesButton = await waitForElement(() =>
      getByTestId('favorites-button')
    );

    fireEvent.click(favoritesButton);

    await waitForElement(() => getByText(/Remove from favorites/i));

    fireEvent.click(favoritesButton);

    await waitForElement(() => getByText(/Add to favorites/i));
  });
});
