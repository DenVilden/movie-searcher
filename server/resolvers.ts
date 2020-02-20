import dayjs from 'dayjs';
import numeral from 'numeral';
import {
  Resolvers,
  Upcoming,
  TopRated,
  MoviesSearch,
  MovieInfo,
} from './types/types';

const attachPoster = (path: string, size = 200) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

const resolvers: Resolvers = {
  Query: {
    upcoming: async (_, __, { dataSources }) => {
      const data: Upcoming[] = await dataSources.moviesAPI.getUpcoming();
      return data
        .slice(0, 12)
        .sort((a, b) => (a.release_date < b.release_date ? 1 : -1));
    },
    topRated: async (_, __, { dataSources }) => {
      const data: TopRated[] = await dataSources.moviesAPI.getTopRated();
      return data.slice(0, 12);
    },
    moviesSearch: async (_, { query }, { dataSources }) => {
      const data: MoviesSearch[] = await dataSources.moviesAPI.getMoviesSearch(
        query
      );
      return data.slice(0, 6);
    },
    movieInfo: async (_, { id }, { dataSources }) => {
      const data: MovieInfo = await dataSources.moviesAPI.getMovieInfo(id);
      return data;
    },
  },

  Upcoming: {
    poster_path: ({ poster_path }) =>
      poster_path ? attachPoster(poster_path) : null,
    release_date: ({ release_date }) =>
      release_date ? dayjs(release_date).format('DD.MM.YYYY') : '',
  },
  TopRated: {
    poster_path: ({ poster_path }) =>
      poster_path ? attachPoster(poster_path) : null,
  },
  MoviesSearch: {
    poster_path: ({ poster_path }) =>
      poster_path ? attachPoster(poster_path) : null,
    release_date: ({ release_date }) =>
      release_date ? dayjs(release_date).format('YYYY') : '',
  },
  SimilarMovies: {
    poster_path: ({ poster_path }) =>
      poster_path ? attachPoster(poster_path) : null,
    release_date: ({ release_date }) => {
      return release_date ? dayjs(release_date).format('YYYY') : '';
    },
  },
  SimilarResults: {
    results: ({ results }) => results.slice(0, 6),
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
  },
};

export default resolvers;
