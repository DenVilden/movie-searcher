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
} from '../mocks/raw-responses';
import { attachPoster } from '../lib/utils';

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
      total_pages: movies.total_pages,
      page: movies.page,
      results: movies.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date:
          movie.release_date && dayjs(movie.release_date).format('DD.MM.YYYY'),
        poster_path: attachPoster(movie.poster_path),
      })),
    };
  }

  private moviesNowPlayingReducer(movies: MockNowPlayingResponse) {
    return {
      total_pages: movies.total_pages,
      page: movies.page,
      results: movies.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        vote_average: movie.vote_average,
        poster_path: attachPoster(movie.poster_path),
      })),
    };
  }

  private moviesSearchReducer(movies: MockMoviesSearchResponse) {
    return {
      results: movies.results
        .map((movie) => ({
          id: movie.id,
          title: movie?.title || movie.name,
          media_type: movie.media_type,
        }))
        .filter((movie) => movie.media_type !== 'person'),
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
      backdrop_path: attachPoster(movie.backdrop_path, 500),
      poster_path: attachPoster(movie.poster_path),
      media_type: 'movie',
      similar: {
        results: movie.similar.results.map((similarMovie) => ({
          id: similarMovie.id,
          title: similarMovie.title,
          release_date:
            similarMovie.release_date &&
            dayjs(similarMovie.release_date).format('YYYY'),
          poster_path: attachPoster(similarMovie.poster_path),
          media_type: 'movie',
        })),
      },
    };
  }

  private tvShowInfoReducer(tv: MockTvShowInfoResponse) {
    return {
      id: tv.id,
      title: tv.name,
      release_date:
        tv.first_air_date && dayjs(tv.first_air_date).format('DD MMMM YYYY'),
      vote_average: tv.vote_average,
      overview: tv.overview,
      backdrop_path: attachPoster(tv.backdrop_path, 500),
      poster_path: attachPoster(tv.poster_path),
      number_of_episodes: tv.number_of_episodes,
      number_of_seasons: tv.number_of_seasons,
      media_type: 'tv',
      similar: {
        results: tv.similar.results.map((similarTvShow) => ({
          id: similarTvShow.id,
          title: similarTvShow.name,
          release_date:
            similarTvShow.first_air_date &&
            dayjs(similarTvShow.first_air_date).format('YYYY'),
          poster_path: attachPoster(similarTvShow.poster_path),
          media_type: 'tv',
        })),
      },
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
