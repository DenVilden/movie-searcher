import HomePage from '../pages';
import { GetMoviesDocument } from '../__generated__';
import { renderApollo, screen } from '../lib/setupTests';

describe('homePage', () => {
  it('should render error state', async () => {
    const mock = [
      {
        request: {
          query: GetMoviesDocument,
          variables: { page: 1 },
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<HomePage />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
