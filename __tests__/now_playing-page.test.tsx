import NowPlaying from '../pages/now_playing/[page]';
import { renderApollo, screen, fireEvent } from '../lib/setupTests';
import { GetNowPlayingDocument } from '../__generated__';

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

describe('nowPlaying', () => {
  it('should switch page and refetch movies', async () => {
    renderApollo(<NowPlaying initialData={mocks} />);

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/now_playing/2');
  });

  it('should render error state', async () => {
    const mock = [
      {
        request: {
          query: GetNowPlayingDocument,
          variables: {
            page: '1',
          },
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<NowPlaying initialData={null as any} />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
