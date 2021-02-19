import TopRatedPage from '../pages/top-rated/[page]';
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

const mocks = {
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
};

describe('topRatedPage', () => {
  it('should switch page and refetch movies', async () => {
    renderApollo(<TopRatedPage initialData={mocks} />);

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/top-rated/2');
  });
});
