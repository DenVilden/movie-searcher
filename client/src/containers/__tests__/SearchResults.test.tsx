import React from 'react';
import SearchResults from '../SearchResults';
import { GetMoviesSearchDocument } from '../../generated/queries.generated';
import { renderApollo, fireEvent, wait } from '../../setupTests';

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
  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetMoviesSearchDocument,
          variables: { query },
        },
        error: new Error('an error has occurred'),
      },
    ];

    const { findByText } = renderApollo(<SearchResults query={query} />, {
      mocks: mockError,
    });

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });

  it('should show message if no results found', async () => {
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

    const { findByText } = renderApollo(<SearchResults query={query} />, {
      mocks: mockMessage,
    });

    const errorElement = await findByText('No results');

    expect(errorElement).toBeTruthy();
  });

  it('should fetch more results when show more button is clicked', async () => {
    const { findByTestId, findAllByTestId } = renderApollo(
      <SearchResults query={query} />,
      {
        mocks,
      }
    );

    const searchResults = await findAllByTestId('search-result');

    expect(searchResults).toHaveLength(1);

    const showMoreButton = await findByTestId('show-more');

    fireEvent.click(showMoreButton);

    await wait();

    const updatedResults = await findAllByTestId('search-result');

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

    const { findByTestId, findAllByTestId } = renderApollo(
      <SearchResults query={query} />,
      {
        mocks: mocksFail,
      }
    );

    const searchResults = await findAllByTestId('search-result');

    const showMoreButton = await findByTestId('show-more');

    fireEvent.click(showMoreButton);

    await wait();

    const updatedResults = await findAllByTestId('search-result');

    expect(updatedResults).toEqual(searchResults);
  });
});
