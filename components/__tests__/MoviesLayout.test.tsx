import { renderApollo } from 'lib/setupTests'
import MoviesLayout from '../MoviesLayout'

const mock = {
  page: 1,
  results: [
    {
      id: 1,
      media_type: 'movie',
      poster_path: null,
      release_date: '2002',
      title: 'upcoming rendered',
    },
  ],
  total_pages: 20,
}

describe('moviesLayout', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(
      <MoviesLayout data={mock} path="upcoming" />,
    )

    const element = asFragment()

    expect(element).toMatchSnapshot()
  })
})
