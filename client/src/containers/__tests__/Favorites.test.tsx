import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import Favorites from '../Favorites';
import {
  GetFavoritesDocument,
  GetMovieInfoDocument,
} from '../../__generated__';
import {
  renderApollo,
  cleanup,
  waitForElement,
  fireEvent,
  wait,
} from '../../setupTests';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    request: {
      query: GetMovieInfoDocument,
      variables: { id: '1' },
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

describe('Favorites', () => {
  afterEach(cleanup);

  it('should redirect to correct url on when favorites item clicked', async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: ['1'] },
    });

    const { getByTestId } = renderApollo(<Favorites />, {
      mocks,
      cache,
    });

    const iconButton = await waitForElement(() => getByTestId('icon-button'));

    fireEvent.click(iconButton);

    await wait();

    const cardButtonElement = await waitForElement(() =>
      getByTestId('favorites-card')
    );

    fireEvent.click(cardButtonElement);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');
  });

  it('should close favorites on click away', async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: ['1'] },
    });

    const { getByTestId, queryByTestId } = renderApollo(<Favorites />, {
      mocks,
      cache,
    });

    const iconButton = await waitForElement(() => getByTestId('icon-button'));

    fireEvent.click(iconButton);

    const dropdownElement = await waitForElement(() =>
      getByTestId(/dropdown/i)
    );

    // fireEvent.keyDown(searchBar, { key: 'Escape', code: 27 });
    fireEvent.click(dropdownElement.firstChild as Element);

    expect(queryByTestId(/dropdown/i)).toBeNull();
  });

  it('should render error on open favorites', async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: ['1'] },
    });

    const mockError = [
      {
        request: {
          query: GetMovieInfoDocument,
          variables: { id: '1' },
        },
        error: new Error('Error'),
      },
    ];

    const { getByTestId, getByRole } = renderApollo(<Favorites />, {
      mocks: mockError,
      cache,
    });

    const iconButton = await waitForElement(() => getByTestId('icon-button'));

    fireEvent.click(iconButton);

    const errorElement = await waitForElement(() => getByRole(/errormessage/i));

    expect(errorElement).toHaveTextContent(/Error/i);
  });
});
