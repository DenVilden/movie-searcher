const axios = require('axios');
const dayjs = require('dayjs');
const numeral = require('numeral');

const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: `${process.env.REACT_APP_MOVIE_API_KEY}` },
});

const attachPoster = (path, size = 200) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

module.exports = {
  Query: {
    upcoming: async () => {
      const { data } = await moviesApi.get('/movie/upcoming');
      return data.results
        .sort((a, b) => (a.release_date < b.release_date ? 1 : -1))
        .slice(0, 12);
    },

    topRated: async () => {
      const { data } = await moviesApi.get('/movie/top_rated');
      return data.results.slice(0, 12);
    },

    moviesSearch: async (_, { query }) => {
      const { data } = await moviesApi.get('/search/movie', {
        params: { query },
      });
      return data.results.slice(0, 6);
    },

    movieInfo: async (_, { id }) => {
      const { data } = await moviesApi.get(`/movie/${id}`, {
        params: { append_to_response: 'similar' },
      });
      return data;
    },
  },

  /* eslint-disable camelcase */
  Upcoming: {
    poster_path: ({ poster_path }) => attachPoster(poster_path),
    release_date: ({ release_date }) => {
      return dayjs(release_date).format('DD.MM.YYYY');
    },
  },

  TopRated: {
    poster_path: ({ poster_path }) => attachPoster(poster_path),
  },

  MoviesSearch: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) => dayjs(release_date).format('YYYY'),
  },

  SimilarMovies: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) => dayjs(release_date).format('YYYY'),
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
      return dayjs(release_date).format('DD MMMM YYYY');
    },
    budget: ({ budget }) => numeral(budget).format('$0,00'),
    revenue: ({ revenue }) => numeral(revenue).format('$0,00'),
  },
};
