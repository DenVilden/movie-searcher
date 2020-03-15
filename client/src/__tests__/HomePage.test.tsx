import React from 'react';
import HomePage from '../pages/index';
import { GetMoviesDocument } from '../generated/queries.generated';
import { renderApollo, fireEvent } from '../setupTests';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    request: {
      query: GetMoviesDocument,
    },
    result: {
      data: {
        upcoming: {
          __typename: 'Upcoming',
          total_pages: 20,
          page: 1,
          results: [
            {
              __typename: 'UpcomingResults',
              id: 1,
              title: 'test',
              release_date: '2020',
              poster_path: null,
            },
          ],
        },
        topRated: {
          __typename: 'TopRated',
          total_pages: 20,
          page: 1,
          results: [
            {
              __typename: 'TopRatedResults',
              id: 1,
              title: 'test',
              vote_average: 5,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe('HomePage', () => {
  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetMoviesDocument,
        },
        error: new Error('an error has occurred'),
      },
    ];

    const { findByText } = renderApollo(<HomePage />, {
      mocks: mockError,
    });

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });

  it('should redirect to correct url when movie card is clicked', async () => {
    const { findAllByTestId } = renderApollo(<HomePage />, {
      mocks,
    });

    const cardButtonElement = await findAllByTestId('card-button');

    fireEvent.click(cardButtonElement[0]);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/[id]', '/movie/1');
  });
});
