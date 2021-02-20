import NowPlayingPage from '../pages/now_playing/[page]';
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
  nowPlaying: {
    total_pages: 20,
    page: 1,
    results: [
      {
        id: 1,
        title: 'now playing page 1',
        vote_average: 5,
        poster_path: null,
      },
    ],
  },
};

describe('nowPlayingPage', () => {
  it('should switch page and refetch movies', async () => {
    renderApollo(<NowPlayingPage initialData={mocks} />);

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/now_playing/2');
  });
});
