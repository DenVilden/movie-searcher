import MoviePage from '../pages/movie/[id]';
import { GetMovieInfoDocument } from '../__generated__';
import { renderApollo, screen } from '../lib/setupTests';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      id: '1',
    },
  }),
}));

const mocks = [
  {
    request: {
      query: GetMovieInfoDocument,
      variables: {
        id: '1',
      },
    },
    error: new Error('an error has occurred'),
  },
];

describe('moviePage', () => {
  it('should render error state', async () => {
    renderApollo(<MoviePage />, { mocks });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
