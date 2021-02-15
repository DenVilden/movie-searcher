import SearchBar from './SearchBar';
import { renderApollo, fireEvent, screen } from '../../lib/setupTests';
import { GetMoviesSearchDocument } from '../../apollo';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

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
  it('should fetch movies, redirect to correct url and clear input value', async () => {
    renderApollo(<SearchBar />, { mocks });

    const inputElement = screen.getByPlaceholderText('type a movie name...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    const searchResult = await screen.findByText('test-title');

    expect(searchResult).toBeInTheDocument();

    expect(inputElement).toHaveProperty('value', 'test');

    fireEvent.click(searchResult);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');

    const clearButton = await screen.findByTitle('Clear');

    fireEvent.click(clearButton);

    expect(inputElement).toHaveProperty('value', '');
  });
});
