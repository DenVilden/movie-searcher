import MoviesAPI from '../Movies';
import {
  mockUpcomingResponse,
  mockTopRatedResponse,
  mockMoviesSearchResponse,
  mockMovieInfoResponse,
} from '../__mocks__/responses';

const mocks = {
  get: jest.fn(),
};

const MockMoviesAPI = class MockMoviesAPI extends MoviesAPI {
  // eslint-disable-next-line class-methods-use-this
  get(): any {}
};
const api = new MockMoviesAPI();
api.get = mocks.get;

describe('MoviesAPI.getUpcomingMovies', () => {
  const mockUpcoming = {
    id: 496243,
    title: 'Parasite',
    release_date: '2019-05-30',
    poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  };

  it('should get get and transform upcoming movies', async () => {
    mocks.get.mockReturnValueOnce(mockUpcomingResponse);
    const res = await api.getUpcoming();

    expect(res).toEqual([mockUpcoming]);
    expect(mocks.get).toBeCalledWith('/movie/upcoming');
  });
});

describe('MoviesAPI.getTopRatedMovies', () => {
  const mockTopRated = {
    id: 19404,
    title: 'Dilwale Dulhania Le Jayenge',
    vote_average: 8.8,
    poster_path: '/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
  };

  it('should get get and transform top rated movies ', async () => {
    mocks.get.mockReturnValueOnce(mockTopRatedResponse);
    const res = await api.getTopRated();

    expect(res).toEqual([mockTopRated]);
    expect(mocks.get).toBeCalledWith('/movie/top_rated');
  });
});

describe('MoviesAPI.getMoviesSearch', () => {
  const mockMoviesSearch = {
    id: 324857,
    title: 'Spider-Man: Into the Spider-Verse',
    release_date: '2018-12-06',
    poster_path: '/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  };

  it('should get get and transform search movies', async () => {
    mocks.get.mockReturnValueOnce(mockMoviesSearchResponse);
    const query = 'spider';
    const res = await api.getMoviesSearch(query);

    expect(res).toEqual([mockMoviesSearch]);
    expect(mocks.get).toBeCalledWith('/search/movie', { query });
  });
});

describe('MoviesAPI.getMovieInfo', () => {
  const mockMovieInfo = {
    id: 556678,
    title: 'Emma',
    release_date: '2020-02-14',
    vote_average: 7.8,
    budget: '0',
    revenue: '0',
    overview:
      'A young woman despite the best intentions, heedlessly meddles in people’s romantic affairs as she tries to play matchmaker.',
    backdrop_path: '/5GbkL9DDRzq3A21nR7Gkv6cFGjq.jpg',
    poster_path: '/sm8iVzA7kRp0d4BSIsgXjsSBMKV.jpg',
    similar: {
      results: [
        {
          id: 281957,
          title: 'The Revenant',
          release_date: '2015',
          poster_path: '/oXUWEc5i3wYyFnL1Ycu8ppxxPvs.jpg',
        },
      ],
    },
  };

  it('should get get and transform movie info', async () => {
    mocks.get.mockReturnValueOnce(mockMovieInfoResponse);
    const id = '556678';
    const res = await api.getMovieInfo(id);

    expect(res).toEqual(mockMovieInfo);
    expect(mocks.get).toBeCalledWith(`/movie/${id}`, {
      append_to_response: 'similar',
    });
  });
});
