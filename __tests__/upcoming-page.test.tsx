import UpcomingPage from '../pages/upcoming/[page]';
import { renderApollo, screen, fireEvent } from '../lib/setupTests';

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
};

describe('upcomingPage', () => {
  it('should switch page and refetch movies', async () => {
    renderApollo(<UpcomingPage initialData={mocks} />);

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/upcoming/2');
  });
});
