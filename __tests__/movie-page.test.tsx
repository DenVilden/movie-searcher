import { GetMovieInfoDocument } from '@/apollo/__generated__'
import { renderApollo, screen } from '@/lib/setupTests'
import MoviePage from '@/pages/movie/[id]'

const mocks = [
  {
    request: {
      query: GetMovieInfoDocument,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        movieInfo: {
          __typename: 'MovieInfo',
          backdrop_path: null,
          budget: '200',
          id: 1,
          media_type: 'movie',
          overview: 'overview',
          poster_path: null,
          release_date: '2002',
          revenue: '300',
          similar: {
            results: [
              {
                __typename: 'SimilarResults',
                id: 2,
                media_type: 'movie',
                poster_path: null,
                release_date: '2002',
                title: 'rendered similar',
              },
            ],
          },
          title: 'rendered movie',
          vote_average: 10,
        },
      },
    },
  },
]

describe('movie page', () => {
  it('should fetch movie by id', async () => {
    const { baseElement } = renderApollo(<MoviePage id="1" />, {
      addTypeName: true,
      mocks,
    })

    await expect(screen.findByText('rendered movie')).resolves.toBeInTheDocument()
    await expect(screen.findByText('rendered similar')).resolves.toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render error state', async () => {
    const mock = [
      {
        error: new Error('an error has occurred'),
        request: {
          query: GetMovieInfoDocument,
          variables: {
            id: '1',
          },
        },
      },
    ]

    renderApollo(<MoviePage id="1" />, { mocks: mock })

    await expect(
      screen.findByText(/an error has occurred/i)
    ).resolves.toBeInTheDocument()
  })
})
