const dayjs = require('dayjs');
const numeral = require('numeral');

const attachPoster = (path, size = 200) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

module.exports = {
  Query: {
    upcoming: async (_, __, { dataSources }) => {
      const data = await dataSources.moviesAPI.getUpcoming();
      return data
        .slice(0, 12)
        .sort((a, b) => (a.release_date < b.release_date ? 1 : -1));
    },
    topRated: async (_, __, { dataSources }) => {
      const data = await dataSources.moviesAPI.getTopRated();
      return data.slice(0, 12);
    },
    moviesSearch: async (_, { query }, { dataSources }) => {
      const data = await dataSources.moviesAPI.getMoviesSearch(query);
      return data.slice(0, 6);
    },
    movieInfo: (_, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovieInfo(id);
    },
  },

  Upcoming: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) => {
      return release_date ? dayjs(release_date).format('DD.MM.YYYY') : '';
    },
  },
  TopRated: {
    poster_path: ({ poster_path }) => attachPoster(poster_path),
  },
  MoviesSearch: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) => {
      return release_date ? dayjs(release_date).format('YYYY') : '';
    },
  },
  SimilarMovies: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) => {
      return release_date ? dayjs(release_date).format('YYYY') : '';
    },
  },
  SimilarResults: {
    results: ({ results }) => results.slice(0, 6),
  },
  MovieInfo: {
    backdrop_path: ({ backdrop_path }) => {
      return backdrop_path && attachPoster(backdrop_path, 500);
    },
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) => {
      return release_date ? dayjs(release_date).format('DD MMMM YYYY') : '';
    },
    budget: ({ budget }) => numeral(budget).format('$0,00'),
    revenue: ({ revenue }) => numeral(revenue).format('$0,00'),
  },
};
