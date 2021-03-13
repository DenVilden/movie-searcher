import { renderApollo, fireEvent, screen } from 'lib/setupTests'
import { GetMoviesSearchDocument } from 'apollo/__generated__'
import SearchBar from '../SearchBar'

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
              title: 'test-movie title',
            },
          ],
        },
      },
    },
  },
]

describe('searchBar', () => {
  it('should check all cases', async () => {
    renderApollo(<SearchBar />, { mocks })

    const inputElement = screen.getByPlaceholderText('Search...')

    // open dropdown
    fireEvent.focus(inputElement)

    // check if empty value doesn't trigger request
    fireEvent.input(inputElement, { target: { value: '   ' } })

    // fetch movie
    fireEvent.input(inputElement, { target: { value: 'test-movie' } })
    const movieSearchResultHighlight = await screen.findByText('test-movie')
    const movieSearchResult = await screen.findByText('title')
    expect(movieSearchResult).toBeInTheDocument()
    expect(movieSearchResultHighlight).toBeInTheDocument()

    // clear input on click
    const clearButton = screen.getByTitle('Clear')
    fireEvent.click(clearButton)
    expect(inputElement).toHaveProperty('value', '')
  })
})
