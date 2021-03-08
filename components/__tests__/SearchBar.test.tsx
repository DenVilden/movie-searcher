import { fireEvent, screen } from '@testing-library/react';

import renderApollo from 'lib/setupTests';
import { GetMoviesSearchDocument } from '__generated__';
import SearchBar from '../SearchBar';

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
      variables: { pageSize: 8, query: 'test' },
    },
    result: {
      data: {
        moviesSearch: {
          results: [
            {
              id: 1,
              media_type: 'movie',
              title: 'test-title',
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

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.change(inputElement, { target: { value: 'test' } });

    const searchResult = await screen.findByText('test-title');

    expect(searchResult).toBeInTheDocument();
    expect(inputElement).toHaveProperty('value', 'test');

    fireEvent.click(searchResult);
    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');

    const clearButton = screen.getByTitle('Clear');
    fireEvent.click(clearButton);
    expect(inputElement).toHaveProperty('value', '');
  });
});
