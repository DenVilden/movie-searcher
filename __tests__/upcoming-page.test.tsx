import UpcomingPage from '../pages/upcoming/[page]';
import { GetUpcomingDocument } from '../__generated__';
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
      query: GetUpcomingDocument,
      variables: { page: 1 },
    },
    result: {
      data: {
        upcoming: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'upcoming page 1',
              release_date: '2002',
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe('upcomingPage', () => {
  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetUpcomingDocument,
          variables: {
            page: 1,
          },
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<UpcomingPage />, { mocks: mockError });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });

  it('should switch page and refetch movies', async () => {
    renderApollo(<UpcomingPage />, { mocks });

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/upcoming/2');
  });
});
