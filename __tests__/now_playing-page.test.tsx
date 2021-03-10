import { renderApollo, screen } from 'lib/setupTests';
import NowPlayingPage from 'pages/now_playing/[page]';
import { GetNowPlayingDocument } from 'apollo/__generated__';

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
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <NowPlayingPage initialData={mocks} page="1" />,
    );

    const element = asFragment();

    expect(element).toMatchSnapshot();
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
