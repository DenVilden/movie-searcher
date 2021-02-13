import TopRated from './TopRated';
import { renderApollo, fireEvent } from '../../lib/setupTests';
import { GetTopRatedDocument } from '../../apollo';

const mocks = {
  topRated: {
    total_pages: 20,
    page: 1,
    results: [
      {
        id: 1,
        title: 'test',
        release_date: '2020',
        poster_path: null,
        vote_average: 10,
      },
    ],
  },
};

describe('topRated', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<TopRated initialData={mocks} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetTopRatedDocument,
          variables: {
            page: 2,
          },
        },
        error: new Error('an error has occurred'),
      },
    ];

    const { findByText, findByLabelText } = renderApollo(
      <TopRated initialData={mocks} />,
      {
        mocks: mockError,
      },
    );

    const pageButton = await findByLabelText('Go to next page');

    fireEvent.click(pageButton);

    const errorElement = await findByText(/an error has occurred/i);

    expect(errorElement).toBeTruthy();
  });
});
