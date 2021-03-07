/* eslint-disable class-methods-use-this */
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import dayjs from 'dayjs';
import numeral from 'numeral';
import type {
  MockUpcomingResponse,
  MockNowPlayingResponse,
  MockMoviesSearchResponse,
  MockMovieInfoResponse,
  MockTvShowInfoResponse,
} from './mocks/raw-responses';
import { attachPoster } from './utils';

export default class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  protected willSendRequest(request: RequestOptions) {
    request.params.set('api_key', process.env.MOVIE_API_KEY as string);
  }

  private moviesUpcomingReducer(movies: MockUpcomingResponse) {
    return {
      page: movies.page,
      results: movies.results.map(movie => ({
        id: movie.id,
        poster_path: attachPoster(movie.poster_path),
        release_date:
          movie.release_date && dayjs(movie.release_date).format('DD.MM.YYYY'),
        title: movie.title,
      })),
      total_pages: movies.total_pages,
    };
  }

  private moviesNowPlayingReducer(movies: MockNowPlayingResponse) {
    return {
      page: movies.page,
      results: movies.results.map(movie => ({
        id: movie.id,
        poster_path: attachPoster(movie.poster_path),
        title: movie.title,
        vote_average: movie.vote_average,
      })),
      total_pages: movies.total_pages,
    };
  }

  private moviesSearchReducer(movies: MockMoviesSearchResponse) {
    return {
      results: movies.results
        .filter(movie => movie.media_type !== 'person')
        .map(movie => ({
          id: movie.id,
          media_type: movie.media_type,
          title: movie?.title || movie.name,
        })),
    };
  }

  private movieInfoReducer(movie: MockMovieInfoResponse) {
    return {
      backdrop_path: attachPoster(movie.backdrop_path, 500),
      budget: numeral(movie.budget).format('$0,00'),
      id: movie.id,
      media_type: 'movie',
      overview: movie.overview,
      poster_path: attachPoster(movie.poster_path),
      release_date:
        movie.release_date && dayjs(movie.release_date).format('DD MMMM YYYY'),
      revenue: numeral(movie.revenue).format('$0,00'),
      similar: {
        results: movie.similar.results.map(similarMovie => ({
          id: similarMovie.id,
          media_type: 'movie',
          poster_path: attachPoster(similarMovie.poster_path),
          release_date:
            similarMovie.release_date &&
            dayjs(similarMovie.release_date).format('YYYY'),
          title: similarMovie.title,
        })),
      },
      title: movie.title,
      vote_average: movie.vote_average,
    };
  }

  private tvShowInfoReducer(tv: MockTvShowInfoResponse) {
    return {
      backdrop_path: attachPoster(tv.backdrop_path, 500),
      id: tv.id,
      media_type: 'tv',
      number_of_episodes: tv.number_of_episodes,
      number_of_seasons: tv.number_of_seasons,
      overview: tv.overview,
      poster_path: attachPoster(tv.poster_path),
      release_date:
        tv.first_air_date && dayjs(tv.first_air_date).format('DD MMMM YYYY'),
      similar: {
        results: tv.similar.results.map(similarTvShow => ({
          id: similarTvShow.id,
          media_type: 'tv',
          poster_path: attachPoster(similarTvShow.poster_path),
          release_date:
            similarTvShow.first_air_date &&
            dayjs(similarTvShow.first_air_date).format('YYYY'),
          title: similarTvShow.name,
        })),
      },
      title: tv.name,
      vote_average: tv.vote_average,
    };
  }

  async getUpcoming(page: string) {
    const data: MockUpcomingResponse = await this.get('/movie/upcoming', {
      page,
    });
    return this.moviesUpcomingReducer(data);
  }

  async getNowPlaying(page: string) {
    const data: MockNowPlayingResponse = await this.get('/movie/now_playing', {
      page,
    });
    return this.moviesNowPlayingReducer(data);
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
