import { fireEvent, renderApollo, screen } from '~/lib/setupTests'
import MovieInfo from '../MovieInfo'

const mock = {
  backdrop_path: null,
  budget: '0',
  id: 1,
  media_type: 'movie' as any,
  overview: 'test data',
  poster_path: null,
  release_date: '2020',
  revenue: '0',
  similar: {
    results: [],
  },
  title: 'test',
  vote_average: 5,
}

describe('movieInfo', () => {
  it('should add and remove from favorites', () => {
    renderApollo(<MovieInfo data={mock} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(button.textContent).toStrictEqual('Remove from favorites')

    fireEvent.click(button)
    expect(button.textContent).toStrictEqual('Add to favorites')
  })
})
