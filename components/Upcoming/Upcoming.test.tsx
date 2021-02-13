import Upcoming from './Upcoming';
import { renderApollo, fireEvent } from '../../lib/setupTests';
import { GetUpcomingDocument } from '../../apollo';

const mocks = {
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
};

describe('upcoming', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<Upcoming initialData={mocks} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should render error state', async () => {
    const mockError = [
      {
        request: {
          query: GetUpcomingDocument,
          variables: {
            page: 2,
          },
        },
        error: new Error('an error has occurred'),
      },
    ];

    const { findByText, findByLabelText } = renderApollo(
      <Upcoming initialData={mocks} />,
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
