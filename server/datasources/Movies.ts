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

  private moviesUpcomingReducer = (
    movie: typeof mockUpcomingResponse.results[0]
  ) => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    poster_path: movie.poster_path,
  });

  private moviesTopRatedReducer = (
    movie: typeof mockTopRatedResponse.results[0]
  ) => ({
    id: movie.id,
    title: movie.title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
  });

  private moviesSearchReducer = (
    movie: typeof mockMoviesSearchResponse.results[0]
  ) => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    poster_path: movie.poster_path,
  });

  private moviesSimilar = (movie: any) => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    poster_path: movie.poster_path,
  });

  private movieInfoReducer = (movie: typeof mockMovieInfoResponse) => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    budget: movie.budget.toString(),
    revenue: movie.revenue.toString(),
    overview: movie.overview,
    backdrop_path: movie.backdrop_path,
    poster_path: movie.poster_path,
    similar: {
      results: Array.isArray(movie.similar.results)
        ? movie.similar.results.map((mov: any) => this.moviesSimilar(mov))
        : [],
    },
  });

  async getUpcoming() {
    const data: typeof mockUpcomingResponse = await this.get('/movie/upcoming');
    return Array.isArray(data.results)
      ? data.results.map(movie => this.moviesUpcomingReducer(movie))
      : [];
  }

  async getTopRated() {
    const data: typeof mockTopRatedResponse = await this.get(
      '/movie/top_rated'
    );
    return Array.isArray(data.results)
      ? data.results.map((movie: any) => this.moviesTopRatedReducer(movie))
      : [];
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
