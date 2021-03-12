import { renderApollo, screen } from 'lib/setupTests'
import UpcomingPage from 'pages/upcoming/[page]'
import { GetUpcomingDocument } from 'apollo/__generated__'

const mocks = {
  upcoming: {
    page: 1,
    results: [
      {
        __typename: 'UpcomingResults' as any,
        id: 1,
        media_type: 'movie',
        poster_path: null,
        release_date: '2002',
        title: 'upcoming page 1',
      },
    ],
    total_pages: 20,
  },
}

describe('upcoming page', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <UpcomingPage initialData={mocks} page={1} />,
      {
        addTypeName: true,
      },
    )

    const element = asFragment()

    expect(element).toMatchSnapshot()
  })

  it('should render error state', async () => {
    const mock = [
      {
        error: new Error('an error has occurred'),
        request: {
          query: GetUpcomingDocument,
          variables: {
            page: 1,
          },
        },
      },
    ]

    renderApollo(<UpcomingPage initialData={mocks} page={1} />, {
      mocks: mock,
    })

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument()
  })
})
