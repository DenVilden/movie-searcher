import React from 'react';
import HomePage from '../HomePage';
import { GetMoviesDocument } from '../../__generated__';
import {
  renderApollo,
  cleanup,
  waitForElement,
  fireEvent,
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
  afterEach(cleanup);

  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetMoviesDocument,
        },
        error: new Error('Error'),
      },
    ];

    const { getByRole } = renderApollo(<HomePage />, { mocks: mockError });

    const errorElement = await waitForElement(() => getByRole(/errormessage/i));

    expect(errorElement).toHaveTextContent(/Error/i);
  });

  it('should redirect to correct url when movie card is clicked', async () => {
    const { getAllByTestId } = renderApollo(<HomePage />, { mocks });

    const cardButtonElement = await waitForElement(
      () => getAllByTestId('card-button')[0]
    );

    fireEvent.click(cardButtonElement);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');
  });
});
