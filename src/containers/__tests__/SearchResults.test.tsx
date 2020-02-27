import React from 'react';
import SearchResults from '../SearchResults';
import { GetMoviesSearchDocument } from '../../__generated__';
import {
  renderApollo,
  cleanup,
  waitForElement,
  fireEvent,
  wait,
} from '../../setupTests';

const query = 'test-title';

const mocks = [
  {
    request: {
      query: GetMoviesSearchDocument,
      variables: { query },
    },
    result: {
      data: {
        moviesSearch: {
          __typename: 'MoviesSearch',
          cursor: 2,
          hasMore: true,
          results: [
            {
              __typename: 'MoviesSearchResults',
              id: 1,
              title: 'test-title',
              release_date: '2020',
              poster_path: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetMoviesSearchDocument,
      variables: { query, cursor: 2 },
    },
    result: {
      data: {
        moviesSearch: {
          __typename: 'MoviesSearch',
          cursor: 2,
          hasMore: false,
          results: [
            {
              __typename: 'MoviesSearchResults',
              id: 1,
              title: 'test-title',
              release_date: '2020',
              poster_path: null,
            },
            {
              __typename: 'MoviesSearchResults',
              id: 2,
              title: 'test-title',
              release_date: '2020',
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe('SearchResults', () => {
  afterEach(cleanup);

  it('should render error state', async () => {
    const error = 'An error has occurred';

    const mockError = [
      {
        request: {
          query: GetMoviesSearchDocument,
          variables: { query },
        },
        error: new Error(error),
      },
    ];

    const { getByRole } = renderApollo(<SearchResults query={query} />, {
      mocks: mockError,
    });

    const errorElement = await waitForElement(() => getByRole(/errormessage/i));

    expect(errorElement).toHaveTextContent(error);
  });

  it('should show message if no results found', async () => {
    const message = 'No results';

    const mockMessage = [
      {
        request: {
          query: GetMoviesSearchDocument,
          variables: { query },
        },
        result: {
          data: {
            moviesSearch: {
              __typename: 'MoviesSearch',
              cursor: 0,
              hasMore: false,
              results: [],
            },
          },
        },
      },
    ];

    const { getByRole } = renderApollo(<SearchResults query={query} />, {
      mocks: mockMessage,
    });

    const errorElement = await waitForElement(() => getByRole(/errormessage/i));

    expect(errorElement).toHaveTextContent(message);
  });

  it('should fetch more results when show more button is clicked', async () => {
    const { getByTestId, getAllByTestId } = renderApollo(
      <SearchResults query={query} />,
      {
        mocks,
      }
    );

    const searchResults = await waitForElement(() =>
      getAllByTestId('search-result')
    );

    expect(searchResults).toHaveLength(1);

    fireEvent.click(getByTestId('show-more'));

    await wait();

    const updatedResults = getAllByTestId('search-result');

    expect(updatedResults).toHaveLength(2);
  });

  it('should return previous results if failed to fetch new results', async () => {
    const mocksFail = [
      mocks[0],
      {
        request: {
          query: GetMoviesSearchDocument,
          variables: { query, cursor: 2 },
        },
        result: {
          data: undefined,
        },
      },
    ];

    const { getByTestId, getAllByTestId } = renderApollo(
      <SearchResults query={query} />,
      {
        mocks: mocksFail,
      }
    );

    const searchResults = await waitForElement(() =>
      getAllByTestId('search-result')
    );

    fireEvent.click(getByTestId('show-more'));

    await wait();

    const updatedResults = getAllByTestId('search-result');

    expect(updatedResults).toEqual(searchResults);
  });
});
