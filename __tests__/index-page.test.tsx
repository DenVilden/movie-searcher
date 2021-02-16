import HomePage from '../pages';
import {
  GetMoviesDocument,
  GetTopRatedDocument,
  GetUpcomingDocument,
} from '../apollo';
import { renderApollo, screen, fireEvent } from '../lib/setupTests';

const mocks = [
  {
    request: {
      query: GetMoviesDocument,
    },
    result: {
      data: {
        upcoming: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'title',
              release_date: '2020',
              poster_path: null,
            },
          ],
        },
        topRated: {
          total_pages: 20,
          page: 1,
          results: [
            {
              id: 1,
              title: 'title',
              vote_average: 5,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetTopRatedDocument,
      variables: { page: 2 },
    },
    result: {
      data: {
        topRated: {
          total_pages: 20,
          page: 2,
          results: [
            {
              id: 2,
              title: 'toprated page 2',
              vote_average: 5,
              poster_path: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetUpcomingDocument,
      variables: { page: 2 },
    },
    result: {
      data: {
        upcoming: {
          total_pages: 20,
          page: 2,
          results: [
            {
              id: 2,
              title: 'upcoming page 2',
              release_date: '2002',
              poster_path: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetTopRatedDocument,
      variables: { page: 3 },
    },
    error: new Error('toprated error'),
  },
  {
    request: {
      query: GetUpcomingDocument,
      variables: { page: 3 },
    },
    error: new Error('upcoming error'),
  },
];

describe('homePage', () => {
  it('should render error state', async () => {
    const mock = [
      {
        request: {
          query: GetMoviesDocument,
        },
        error: new Error('an error has occurred'),
      },
    ];

    renderApollo(<HomePage />, { mocks: mock });

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });

  it('should switch page and refetch movies', async () => {
    renderApollo(<HomePage />, { mocks });

    const pageButton = await screen.findAllByLabelText('Go to next page');

    fireEvent.click(pageButton[0]);
    fireEvent.click(pageButton[1]);

    expect(await screen.findByText('toprated page 2')).toBeInTheDocument();
    expect(await screen.findByText('upcoming page 2')).toBeInTheDocument();
  });

  it('should should render error state when switching page', async () => {
    renderApollo(<HomePage />, { mocks });

    const pageButton = await screen.findAllByLabelText(/page 3/i);

    fireEvent.click(pageButton[0]);
    fireEvent.click(pageButton[1]);

    expect(await screen.findByText(/upcoming error/i)).toBeInTheDocument();
    expect(await screen.findByText(/toprated error/i)).toBeInTheDocument();
  });
});
