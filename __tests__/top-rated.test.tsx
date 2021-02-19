import TopRatedPage from '../pages/top-rated/[page]';
import { GetTopRatedDocument } from '../__generated__';
import { renderApollo, screen, fireEvent } from '../lib/setupTests';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
    query: {
      page: 1,
    },
  }),
}));

const mocks = [
  {
    request: {
      query: GetTopRatedDocument,
      variables: { page: 1 },
    },
    result: {
      data: {
        topRated: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'top-rated page 1',
              vote_average: 5,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe('topRatedPage', () => {
  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetTopRatedDocument,
          variables: {
            page: 1,
          },
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<TopRatedPage />, { mocks: mockError });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });

  it('should switch page and refetch movies', async () => {
    renderApollo(<TopRatedPage />, { mocks });

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/top-rated/2');
  });
});
