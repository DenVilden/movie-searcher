import { renderApollo, fireEvent, screen } from '../../lib/setupTests';
import MovieCard from '../MovieCard';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mock = {
  id: 1,
  media_type: 'movie',
  poster_path: null,
  release_date: '2020',
  title: 'test',
  vote_average: 5,
};

describe('movieCard', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderApollo(<MovieCard movie={mock} />);

    const element = asFragment();

    expect(element).toMatchSnapshot();
  });

  it('should redirect to correct url when movie card is clicked', () => {
    renderApollo(<MovieCard movie={mock} />);

    const cardButtonElement = screen.getByRole('button');

    fireEvent.click(cardButtonElement);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');
  });
});
