import MoviesAPI from '../Movies';
import {
  mockUpcomingResponse,
  mockTopRatedResponse,
  mockMoviesSearchResponse,
  mockMovieInfoResponse,
  mockUpcoming,
  mockTopRated,
  mockMoviesSearch,
  mockMovieInfo,
} from '../__mocks__/responses';

const mocks = {
  get: jest.fn(),
};

class MockMoviesAPI extends MoviesAPI {
  get = mocks.get;
}
const api = new MockMoviesAPI();

describe('getUpcomingMovies', () => {
  it('should get upcoming', async () => {
    mocks.get.mockReturnValueOnce(mockUpcomingResponse);

    const page = 1;
    const res = await api.getUpcoming(page);

    expect(res).toEqual(mockUpcoming);
    expect(mocks.get).toBeCalledWith('/movie/upcoming', { page });
  });

  it('should get 1st page if no page specified', async () => {
    mocks.get.mockReturnValueOnce(mockUpcomingResponse);

    const res = await api.getUpcoming();

    expect(res).toEqual(mockUpcoming);
    expect(mocks.get).toBeCalledWith('/movie/upcoming', { page: 1 });
  });
});

describe('getTopRatedMovies', () => {
  it('should get and transform top rated movies ', async () => {
    mocks.get.mockReturnValueOnce(mockTopRatedResponse);

    const page = 1;
    const res = await api.getTopRated(page);

    expect(res).toEqual(mockTopRated);
    expect(mocks.get).toBeCalledWith('/movie/top_rated', { page });
  });

  it('should get 1st page if no page specified', async () => {
    mocks.get.mockReturnValueOnce(mockTopRatedResponse);

    const res = await api.getTopRated();

    expect(res).toEqual(mockTopRated);
    expect(mocks.get).toBeCalledWith('/movie/top_rated', { page: 1 });
  });
});

describe('getMoviesSearch', () => {
  it('should get and transform search movies', async () => {
    mocks.get.mockReturnValueOnce(mockMoviesSearchResponse);

    const query = 'spider';
    const res = await api.getMoviesSearch(query);

    expect(res).toEqual(mockMoviesSearch);
    expect(mocks.get).toBeCalledWith('/search/movie', { query });
  });
});

describe('getMovieInfo', () => {
  it('should get and transform movie info', async () => {
    mocks.get.mockReturnValueOnce(mockMovieInfoResponse);

    const id = '556678';
    const res = await api.getMovieInfo(id);

    expect(res).toEqual(mockMovieInfo);
    expect(mocks.get).toBeCalledWith(`/movie/${id}`, {
      append_to_response: 'similar',
    });
  });
});
