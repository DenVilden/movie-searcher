import UpcomingPage from '../pages/upcoming/[page]';
import { renderApollo, screen, fireEvent } from '../lib/setupTests';
import { GetUpcomingDocument } from '../__generated__';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
    query: {
      page: '1',
    },
  }),
}));

const mocks = {
  upcoming: {
    page: 1,
    results: [
      {
        id: 1,
        poster_path: null,
        release_date: '2002',
        title: 'upcoming page 1',
      },
    ],
    total_pages: 20,
  },
};

describe('upcoming page', () => {
  it('should switch page and refetch movies', async () => {
    renderApollo(<UpcomingPage initialData={mocks} />);

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/upcoming/2');
  });

  it('should render error state', async () => {
    const mock = [
      {
        error: new Error('an error has occurred'),
        request: {
          query: GetUpcomingDocument,
          variables: {
            page: '1',
          },
        },
      },
    ];

    renderApollo(<UpcomingPage initialData={null as any} />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
