import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import {
  mockUpcomingResponse,
  mockTopRatedResponse,
  mockMoviesSearchResponse,
  mockMovieInfoResponse,
} from './__mocks__/responses';

export default class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  protected willSendRequest(request: RequestOptions) {
    request.params.set('api_key', this.context.key);
  }

  private moviesUpcomingReducer = (movies: typeof mockUpcomingResponse) => ({
    total_pages: movies.total_pages,
    page: movies.page,
    cursor: null,
    hasMore: null,
    results: Array.isArray(movies.results)
      ? movies.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        }))
      : [],
  });

  private moviesTopRatedReducer = (movies: typeof mockTopRatedResponse) => ({
    total_pages: movies.total_pages,
    page: movies.page,
    cursor: null,
    hasMore: null,
    results: Array.isArray(movies.results)
      ? movies.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
        }))
      : [],
  });

  private moviesSearchReducer = (
    movie: typeof mockMoviesSearchResponse.results[0]
  ) => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    poster_path: movie.poster_path,
  });

  private movieInfoReducer = (movies: typeof mockMovieInfoResponse) => ({
    id: movies.id,
    title: movies.title,
    release_date: movies.release_date,
    vote_average: movies.vote_average,
    budget: movies.budget.toString(),
    revenue: movies.revenue.toString(),
    overview: movies.overview,
    backdrop_path: movies.backdrop_path,
    poster_path: movies.poster_path,
    similar: Array.isArray(movies.similar.results)
      ? movies.similar.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        }))
      : [],
  });

  async getUpcoming(page: number | null | undefined) {
    const data: typeof mockUpcomingResponse = await this.get(
      '/movie/upcoming',
      { page: page || 1 }
    );
    return this.moviesUpcomingReducer(data);
  }

  async getTopRated(page: number | null | undefined) {
    const data: typeof mockTopRatedResponse = await this.get(
      '/movie/top_rated',
      { page: page || 1 }
    );
    return this.moviesTopRatedReducer(data);
  }

  async getMoviesSearch(query: string) {
    const data: typeof mockMoviesSearchResponse = await this.get(
      '/search/movie',
      { query }
    );
    return Array.isArray(data.results)
      ? data.results.map(movie => this.moviesSearchReducer(movie))
      : [];
  }

  async getMovieInfo(id: string) {
    const data: typeof mockMovieInfoResponse = await this.get(`/movie/${id}`, {
      append_to_response: 'similar',
    });
    return this.movieInfoReducer(data);
  }
}
