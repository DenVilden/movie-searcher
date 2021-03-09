import { renderApollo, fireEvent, screen } from 'lib/setupTests';
import NowPlayingPage from 'pages/now_playing/[page]';
import { GetNowPlayingDocument } from 'apollo/__generated__';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = {
  nowPlaying: {
    page: 1,
    results: [
      {
        id: 1,
        poster_path: null,
        title: 'now playing page 1',
        vote_average: 5,
      },
    ],
    total_pages: 20,
  },
};

describe('now playing page', () => {
  it('should switch page and refetch movies', async () => {
    renderApollo(<NowPlayingPage initialData={mocks} page="1" />);

    const pageButton = await screen.findByLabelText('Go to page 2');

    fireEvent.click(pageButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/now_playing/2');
  });

  it('should render error state', async () => {
    const mock = [
      {
        error: new Error('an error has occurred'),
        request: {
          query: GetNowPlayingDocument,
          variables: {
            page: '1',
          },
        },
      },
    ];

    renderApollo(<NowPlayingPage initialData={mocks} page="1" />, {
      mocks: mock,
    });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
