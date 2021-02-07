import Favorites from './Favorites';
import { GetMovieInfoDocument, favoritesVar } from '../../apollo';
import { renderApollo, fireEvent } from '../../setupTests';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    request: {
      query: GetMovieInfoDocument,
      variables: { id: '1' },
    },
    result: {
      data: {
        movieInfo: {
          id: 1,
          backdrop_path: null,
          poster_path: null,
          title: 'test',
          overview: 'test data',
          budget: '0',
          revenue: '0',
          vote_average: 5,
          release_date: '2020',
          similar: {
            results: [
              {
                id: 1,
                title: 'test',
                release_date: '2020',
                poster_path: null,
              },
            ],
          },
        },
      },
    },
  },
];

describe('favorites', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<Favorites />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should redirect to correct url when favorites item clicked', async () => {
    favoritesVar([mocks[0].result.data.movieInfo]);

    const { findByTestId } = renderApollo(<Favorites />, {
      mocks,
    });

    const iconButton = await findByTestId('icon-button');

    fireEvent.click(iconButton);

    const cardButtonElement = await findByTestId('favorites-card');

    fireEvent.click(cardButtonElement);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');
  });
});
