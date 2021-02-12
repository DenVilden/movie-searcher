import HomePage from '../pages';
import { GetMoviesDocument } from '../apollo';
import { renderApollo, fireEvent } from '../utils/setupTests';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    request: {
      query: GetMoviesDocument,
    },
    result: {
      data: {
        upcoming: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'test',
              release_date: '2020',
              poster_path: null,
            },
          ],
        },
        topRated: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'test',
              vote_average: 5,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
];

describe('homePage', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<HomePage />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetMoviesDocument,
        },
        error: new Error('an error has occurred'),
      },
    ];

    const { findByText } = renderApollo(<HomePage />, {
      mocks: mockError,
    });

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });

  it('should redirect to correct url when movie card is clicked', async () => {
    const { findAllByTestId } = renderApollo(<HomePage />, {
      mocks,
    });

    const cardButtonElement = await findAllByTestId('card-button');

    fireEvent.click(cardButtonElement[0]);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');
  });

  it('should switch page and refetch movies', async () => {
    const { findByText, findAllByLabelText } = renderApollo(<HomePage />, {
      mocks,
    });

    const pageButton = await findAllByLabelText('Go to next page');

    fireEvent.click(pageButton[0]);
    fireEvent.click(pageButton[1]);

    expect(findByText('page-2')).toBeTruthy();
  });
});
