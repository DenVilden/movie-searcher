const { create } = require('axios');
const dayjs = require('dayjs');
const numeral = require('numeral');

const axios = create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: process.env.REACT_APP_MOVIE_API_KEY },
});

const attachPoster = (path, size = 200) =>
  `https://image.tmdb.org/t/p/w${size}${path}`;

module.exports = {
  Query: {
    upcoming: async () => {
      try {
        const { data } = await axios.get('/movie/upcoming');
        return data.results
          .sort((a, b) => (a.release_date < b.release_date ? 1 : -1))
          .slice(0, 12);
      } catch (error) {
        throw new Error(error.response.data.status_message);
      }
    },
    topRated: async () => {
      try {
        const { data } = await axios.get('/movie/top_rated');
        return data.results.slice(0, 12);
      } catch (error) {
        throw new Error(error.response.data.status_message);
      }
    },
    moviesSearch: async (_, { query }) => {
      try {
        const { data } = await axios.get('/search/movie', {
          params: { query },
        });
        return data.results.slice(0, 6);
      } catch (error) {
        throw new Error(error.response.data.status_message);
      }
    },
    movieInfo: async (_, { id }) => {
      try {
        const { data } = await axios.get(`/movie/${id}`, {
          params: { append_to_response: 'similar' },
        });
        return data;
      } catch (error) {
        throw new Error(error.response.data.status_message);
      }
    },
  },
  /* eslint-disable camelcase */
  Upcoming: {
    poster_path: ({ poster_path }) => attachPoster(poster_path),
    release_date: ({ release_date }) =>
      dayjs(release_date).format('DD.MM.YYYY'),
  },

  TopRated: {
    poster_path: ({ poster_path }) => attachPoster(poster_path),
  },

  MoviesSearch: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) =>
      release_date && dayjs(release_date).format('YYYY'),
  },

  SimilarMovies: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) =>
      release_date && dayjs(release_date).format('YYYY'),
  },

  SimilarResults: {
    results: ({ results }) => results.slice(0, 6),
  },

  MovieInfo: {
    backdrop_path: ({ backdrop_path }) =>
      backdrop_path && attachPoster(backdrop_path, 500),
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    release_date: ({ release_date }) =>
      release_date && dayjs(release_date).format('DD MMMM YYYY'),
    budget: ({ budget }) => numeral(budget).format('$0,00'),
    revenue: ({ revenue }) => numeral(revenue).format('$0,00'),
  },
};
