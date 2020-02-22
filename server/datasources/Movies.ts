import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import dayjs from 'dayjs';
import numeral from 'numeral';
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

  attachPoster = (path: string, size = 200) => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/w${size}${path}`;
  };

  private moviesUpcomingReducer = (movies: typeof mockUpcomingResponse) => ({
    total_pages: movies.total_pages,
    page: movies.page,
    results: Array.isArray(movies.results)
      ? movies.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          release_date: dayjs(movie.release_date).format('DD.MM.YYYY'),
          poster_path: this.attachPoster(movie.poster_path),
        }))
      : [],
  });

  private moviesTopRatedReducer = (movies: typeof mockTopRatedResponse) => ({
    total_pages: movies.total_pages,
    page: movies.page,
    results: Array.isArray(movies.results)
      ? movies.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          poster_path: this.attachPoster(movie.poster_path),
        }))
      : [],
  });

  private moviesSearchReducer = (movies: typeof mockMoviesSearchResponse) => ({
    cursor: null,
    hasMore: null,
    results: Array.isArray(movies.results)
      ? movies.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          release_date: dayjs(movie.release_date).format('YYYY'),
          poster_path: this.attachPoster(movie.poster_path),
        }))
      : [],
  });

  private movieInfoReducer = (movie: typeof mockMovieInfoResponse) => ({
    results: {
      id: movie.id,
      title: movie.title,
      release_date: dayjs(movie.release_date).format('DD MMMM YYYY'),
      vote_average: movie.vote_average,
      budget: numeral(movie.budget).format('$0,00'),
      revenue: numeral(movie.revenue).format('$0,00'),
      overview: movie.overview,
      backdrop_path: this.attachPoster(movie.backdrop_path, 500),
      poster_path: this.attachPoster(movie.poster_path),
    },
    similar_results: Array.isArray(movie.similar.results)
      ? movie.similar.results.map(similarMovie => ({
          id: similarMovie.id,
          title: similarMovie.title,
          release_date: dayjs(similarMovie.release_date).format('YYYY'),
          poster_path: this.attachPoster(similarMovie.poster_path),
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
    return this.moviesSearchReducer(data);
  }

  async getMovieInfo(id: string) {
    const data: typeof mockMovieInfoResponse = await this.get(`/movie/${id}`, {
      append_to_response: 'similar',
    });
    return this.movieInfoReducer(data);
  }
}
