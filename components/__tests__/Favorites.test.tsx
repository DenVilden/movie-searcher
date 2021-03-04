import Favorites from '../Favorites';
import { renderApollo, fireEvent, screen } from '../../lib/setupTests';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    backdrop_path: null,
    budget: '0',
    id: 1,
    media_type: 'movie',
    overview: 'test data',
    poster_path: null,
    release_date: '2020',
    revenue: '0',
    similar: {
      results: [
        {
          id: 1,
          poster_path: null,
          release_date: '2020',
          title: 'test',
        },
      ],
    },
    title: 'test',
    vote_average: 5,
  },
];

describe('favorites', () => {
  it('should redirect to correct url when favorites item clicked', () => {
    localStorage.setItem('favorites', JSON.stringify(mocks));

    renderApollo(<Favorites />);

    const iconButton = screen.getByRole('button');

    fireEvent.click(iconButton);

    const cardButtonElement = screen.getByRole('button');

    fireEvent.click(cardButtonElement);

    expect(mockHistoryPush).toHaveBeenCalledWith('/movie/1');
  });
});
