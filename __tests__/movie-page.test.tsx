import MoviePage from '../pages/movie/[id]';
import { GetMovieInfoDocument } from '../apollo';
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

    const errorElement = await screen.findByText(/an error has occurred/i);

    expect(errorElement).toBeInTheDocument();
  });
});
