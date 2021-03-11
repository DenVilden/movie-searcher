import { renderApollo, fireEvent, screen } from 'lib/setupTests';
import { GetMoviesSearchDocument } from 'apollo/__generated__';
import SearchBar from '../SearchBar';

const mocks = [
  {
    request: {
      query: GetMoviesSearchDocument,
      variables: { query: 'test-movie' },
    },
    result: {
      data: {
        moviesSearch: {
          results: [
            {
              id: 1,
              media_type: 'movie',
              title: 'test-movie',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetMoviesSearchDocument,
      variables: { query: 'test-tv' },
    },
    result: {
      data: {
        moviesSearch: {
          results: [
            {
              id: 1,
              media_type: 'tv',
              title: 'test-tv',
            },
          ],
        },
      },
    },
  },
];

describe('searchBar', () => {
  it('should check all cases', async () => {
    renderApollo(<SearchBar />, { mocks });

    const inputElement = screen.getByPlaceholderText('Search...');

    // check if empty value doesn't trigger request
    fireEvent.input(inputElement, { target: { value: '   ' } });

    // fetch movie and render related icon
    fireEvent.input(inputElement, { target: { value: 'test-movie' } });
    const movieSearchResult = await screen.findByText('test-movie');
    expect(movieSearchResult).toBeInTheDocument();
    expect(inputElement).toHaveProperty('value', 'test-movie');

    // fetch tv and render related icon
    fireEvent.input(inputElement, { target: { value: 'test-tv' } });
    const tvSearchResults = await screen.findByText('test-tv');
    expect(tvSearchResults).toBeInTheDocument();
    expect(inputElement).toHaveProperty('value', 'test-tv');

    // clear input on click
    const clearButton = screen.getByTitle('Clear');
    fireEvent.click(clearButton);
    expect(inputElement).toHaveProperty('value', '');
  });
});
