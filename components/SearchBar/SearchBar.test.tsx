import SearchBar from './SearchBar';
import { renderApollo, fireEvent } from '../../lib/setupTests';
import { GetMoviesSearchDocument } from '../../apollo';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock('next/link', () => ({ children }: { children: any }) => children);

const mocks = [
  {
    request: {
      query: GetMoviesSearchDocument,
      variables: { query: 'test', pageSize: 8 },
    },
    result: {
      data: {
        moviesSearch: {
          results: [
            {
              id: 1,
              title: 'test-title',
            },
          ],
        },
      },
    },
  },
];

describe('searchBar', () => {
  it('should update input with new value and fetch movies', async () => {
    const { findByPlaceholderText, findByText } = renderApollo(<SearchBar />, {
      mocks,
    });

    const inputElement = await findByPlaceholderText('type a movie name...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    const searchResult = await findByText('test-title');

    expect(searchResult).toBeTruthy();

    expect(inputElement).toHaveProperty('value', 'test');
  });

  it('should redirect to correct url on click and clear input value', async () => {
    const { findByPlaceholderText, findByText, findByTitle } = renderApollo(
      <SearchBar />,
      {
        mocks,
      },
    );

    const inputElement = await findByPlaceholderText('type a movie name...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    const searchResult = await findByText('test-title');

    fireEvent.click(searchResult);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');

    const clearButton = await findByTitle('Clear');

    fireEvent.click(clearButton);

    expect(inputElement).toHaveProperty('value', '');
  });
});
