import Tv from '../pages/tv/[id]';
import { GetTvShowInfoDocument } from '../__generated__';
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
      query: GetTvShowInfoDocument,
      variables: {
        id: '1',
      },
    },
    error: new Error('an error has occurred'),
  },
];

describe('tv', () => {
  it('should render error state', async () => {
    renderApollo(<Tv />, { mocks });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
