import React from 'react';
import Header from '../Header';
import { renderApollo, fireEvent } from '../../setupTests';
import { GetMoviesSearchDocument } from '../../generated/queries.generated';

const mocks = [
  {
    request: {
      query: GetMoviesSearchDocument,
      variables: { query: 'test' },
    },
    result: {
      data: {
        moviesSearch: {
          __typename: 'MoviesSearch',
          results: [
            {
              __typename: 'MoviesSearchResults',
              id: 1,
              title: 'test-title',
            },
          ],
        },
      },
    },
  },
];

// TODO: figure out how to test lazy queries
describe('Header', () => {
  it('should update input with new value', async () => {
    const { findByPlaceholderText } = renderApollo(<Header />, {
      mocks,
    });

    const inputElement = await findByPlaceholderText('type a movie name...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    const changedInputElement = await findByPlaceholderText(
      'type a movie name...'
    );

    expect(changedInputElement).toHaveProperty('value', 'test');
  });
});
