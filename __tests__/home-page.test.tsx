import Home from '../pages';
import { GetMoviesDocument } from '../__generated__';
import { renderApollo, screen } from '../lib/setupTests';

describe('home', () => {
  it('should render error state', async () => {
    const mock = [
      {
        request: {
          query: GetMoviesDocument,
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<Home />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
