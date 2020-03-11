import React from 'react';
import TopRated from '../TopRated';
import { GetTopRatedDocument } from '../../__generated__';
import {
  renderApollo,
  cleanup,
  waitForElement,
  fireEvent,
} from '../../setupTests';
import { TopRated as TopRatedType } from '../../__generated__/types';

const mocks = [
  {
    request: {
      query: GetTopRatedDocument,
      variables: { page: 1 },
    },
    result: {
      data: {
        topRated: {
          __typename: 'TopRated',
          total_pages: 20,
          page: 1,
          results: [
            {
              __typename: 'TopRatedResults',
              id: 1,
              title: 'page-1',
              vote_average: 3.6,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetTopRatedDocument,
      variables: { page: 2 },
    },
    result: {
      data: {
        topRated: {
          __typename: 'TopRated',
          total_pages: 20,
          page: 2,
          results: [
            {
              __typename: 'TopRatedResults',
              id: 2,
              title: 'page-2',
              vote_average: 3.6,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe('TopRated', () => {
  afterEach(cleanup);

  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetTopRatedDocument,
          variables: { page: 1 },
        },
        error: new Error('Error'),
      },
    ];

    const { getByRole, getByLabelText } = renderApollo(
      <TopRated initialData={mocks[0].result.data.topRated as TopRatedType} />,
      { mocks: mockError }
    );

    const pageButton = await waitForElement(() =>
      getByLabelText(/Go to next page/i)
    );

    fireEvent.click(pageButton);

    const errorElement = await waitForElement(() => getByRole(/errormessage/i));

    expect(errorElement).toHaveTextContent(/Error/i);
  });

  it('should switch page and refetch movies', async () => {
    const { getByText, getByLabelText } = renderApollo(
      <TopRated initialData={mocks[0].result.data.topRated as TopRatedType} />,
      { mocks }
    );

    const pageButton = await waitForElement(() =>
      getByLabelText(/Go to next page/i)
    );

    fireEvent.click(pageButton);

    await waitForElement(() => [getByText('page-2')]);
  });
});
