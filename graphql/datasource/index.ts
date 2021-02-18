/* eslint-disable class-methods-use-this */
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import dayjs from 'dayjs';
import numeral from 'numeral';
import type {
  MockUpcomingResponse,
  MockTopRatedResponse,
  MockMoviesSearchResponse,
  MockMovieInfoResponse,
  MockTvShowInfoResponse,
} from '../mocks/raw-responses';

export default class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  protected willSendRequest(request: RequestOptions) {
    request.params.set('api_key', this.context.key);
  }

  attachPoster(path: string, size = 200) {
    return path ? `https://image.tmdb.org/t/p/w${size}${path}` : null;
  }

  private moviesUpcomingReducer(movies: MockUpcomingResponse) {
    return {
      total_pages: movies.total_pages,
      page: movies.page,
      results: Array.isArray(movies.results)
        ? movies.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            release_date:
              movie.release_date &&
              dayjs(movie.release_date).format('DD.MM.YYYY'),
            poster_path: this.attachPoster(movie.poster_path),
            media_type: 'movie',
          }))
        : [],
    };
  }

  private moviesTopRatedReducer(movies: MockTopRatedResponse) {
    return {
      total_pages: movies.total_pages,
      page: movies.page,
      results: Array.isArray(movies.results)
        ? movies.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            vote_average: movie.vote_average,
            poster_path: this.attachPoster(movie.poster_path),
            media_type: 'movie',
          }))
        : [],
    };
  }

  private moviesSearchReducer(movies: MockMoviesSearchResponse) {
    return {
      results: Array.isArray(movies.results)
        ? movies.results
            .map((movie) => ({
              id: movie.id,
              title: movie?.title || movie.name,
              media_type: movie.media_type,
            }))
            .filter((movie) => movie.media_type !== 'person')
        : [],
    };
  }

  private movieInfoReducer(movie: MockMovieInfoResponse) {
    return {
      id: movie.id,
      title: movie.title,
      release_date:
        movie.release_date && dayjs(movie.release_date).format('DD MMMM YYYY'),
      vote_average: movie.vote_average,
      budget: numeral(movie.budget).format('$0,00'),
      revenue: numeral(movie.revenue).format('$0,00'),
      overview: movie.overview,
      backdrop_path: this.attachPoster(movie.backdrop_path, 500),
      poster_path: this.attachPoster(movie.poster_path),
      media_type: 'movie',
      similar: {
        results: Array.isArray(movie.similar.results)
          ? movie.similar.results.map((similarMovie) => ({
              id: similarMovie.id,
              title: similarMovie.title,
              release_date:
                similarMovie.release_date &&
                dayjs(similarMovie.release_date).format('YYYY'),
              poster_path: this.attachPoster(similarMovie.poster_path),
              media_type: 'movie',
            }))
          : [],
      },
    };
  }

  private tvShowInfoReducer(movie: MockTvShowInfoResponse) {
    return {
      id: movie.id,
      title: movie.name,
      release_date:
        movie.first_air_date &&
        dayjs(movie.first_air_date).format('DD MMMM YYYY'),
      vote_average: movie.vote_average,
      overview: movie.overview,
      backdrop_path: this.attachPoster(movie.backdrop_path, 500),
      poster_path: this.attachPoster(movie.poster_path),
      number_of_episodes: movie.number_of_episodes,
      number_of_seasons: movie.number_of_seasons,
      media_type: 'tv',
      similar: {
        results: Array.isArray(movie.similar.results)
          ? movie.similar.results.map((similarMovie) => ({
              id: similarMovie.id,
              title: similarMovie.name,
              release_date:
                similarMovie.first_air_date &&
                dayjs(similarMovie.first_air_date).format('YYYY'),
              poster_path: this.attachPoster(similarMovie.poster_path),
              media_type: 'tv',
            }))
          : [],
      },
    };
  }

  async getUpcoming(page = 1) {
    const data: MockUpcomingResponse = await this.get('/movie/upcoming', {
      page,
    });
    return this.moviesUpcomingReducer(data);
  }

  async getTopRated(page = 1) {
    const data: MockTopRatedResponse = await this.get('/movie/top_rated', {
      page,
    });
    return this.moviesTopRatedReducer(data);
  }

  async getMoviesSearch(query: string) {
    const data: MockMoviesSearchResponse = await this.get('/search/multi', {
      query,
    });
    return this.moviesSearchReducer(data);
  }

  async getMovieInfo(id: string) {
    const data: MockMovieInfoResponse = await this.get(`/movie/${id}`, {
      append_to_response: 'similar',
    });
    return this.movieInfoReducer(data);
  }

  async getTvShowInfo(id: string) {
    const data: MockTvShowInfoResponse = await this.get(`/tv/${id}`, {
      append_to_response: 'similar',
    });
    return this.tvShowInfoReducer(data);
  }
}
