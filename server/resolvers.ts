import dayjs from 'dayjs';
import numeral from 'numeral';
import {
  Resolvers,
  Upcoming,
  TopRated,
  MoviesSearch,
  MovieInfo,
} from './types/types';
import { paginateResults } from './utils';

const attachPoster = (path: string, size = 200) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

const resolvers: Resolvers = {
  Query: {
    upcoming: async (_, { page, cursor }, { dataSources }) => {
      const data: Upcoming = await dataSources.moviesAPI.getUpcoming(page);
      return paginateResults(data, cursor);
    },
    topRated: async (_, { page, cursor }, { dataSources }) => {
      const data: TopRated = await dataSources.moviesAPI.getTopRated(page);
      return paginateResults(data, cursor);
    },
    moviesSearch: async (_, { query }, { dataSources }) => {
      const data: MoviesSearch[] = await dataSources.moviesAPI.getMoviesSearch(
        query
      );
      return data.slice(0, 8);
    },
    movieInfo: async (_, { id }, { dataSources }) => {
      const data: MovieInfo = await dataSources.moviesAPI.getMovieInfo(id);
      return data;
    },
  },

  Upcoming: {
    results: ({ results }) =>
      results
        .sort((a, b) => (a.release_date < b.release_date ? 1 : -1))
        .map(movie => ({
          ...movie,
          poster_path: movie.poster_path
            ? attachPoster(movie.poster_path)
            : null,
          release_date: movie.release_date
            ? dayjs(movie.release_date).format('DD.MM.YYYY')
            : '',
        })),
  },
  TopRated: {
    results: ({ results }) =>
      results.map(movie => ({
        ...movie,
        poster_path: movie.poster_path ? attachPoster(movie.poster_path) : null,
      })),
  },
  MoviesSearch: {
    poster_path: ({ poster_path }) =>
      poster_path ? attachPoster(poster_path) : null,
    release_date: ({ release_date }) =>
      release_date ? dayjs(release_date).format('YYYY') : '',
  },
  MovieInfo: {
    backdrop_path: ({ backdrop_path }) =>
      backdrop_path ? attachPoster(backdrop_path, 500) : null,
    poster_path: ({ poster_path }) =>
      poster_path ? attachPoster(poster_path) : null,
    release_date: ({ release_date }) =>
      release_date ? dayjs(release_date).format('DD MMMM YYYY') : '',
    budget: ({ budget }) => numeral(budget).format('$0,00'),
    revenue: ({ revenue }) => numeral(revenue).format('$0,00'),
    similar: ({ similar }) =>
      similar.slice(0, 4).map(movie => ({
        ...movie,
        poster_path: movie.poster_path ? attachPoster(movie.poster_path) : null,
        release_date: movie.release_date
          ? dayjs(movie.release_date).format('YYYY')
          : '',
      })),
  },
};

export default resolvers;
