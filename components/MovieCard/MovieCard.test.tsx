import { renderApollo, fireEvent, screen } from '../../lib/setupTests';
import MovieCard from './MovieCard';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mock = {
  id: 1,
  poster_path: null,
  title: 'test',
  vote_average: 5,
  release_date: '2020',
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
