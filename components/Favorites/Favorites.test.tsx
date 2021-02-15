import Favorites from './Favorites';
import { renderApollo, fireEvent, screen } from '../../lib/setupTests';

const mockHistoryPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockHistoryPush,
  }),
}));

const mocks = [
  {
    id: 1,
    backdrop_path: null,
    poster_path: null,
    title: 'test',
    overview: 'test data',
    budget: '0',
    revenue: '0',
    vote_average: 5,
    release_date: '2020',
    similar: {
      results: [
        {
          id: 1,
          title: 'test',
          release_date: '2020',
          poster_path: null,
        },
      ],
    },
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
