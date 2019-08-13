/* eslint-disable camelcase */
const axios = require('axios');
const { gql } = require('apollo-server-express');

const moviesApi = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: { api_key: process.env.MOVIE_API_KEY }
});

const attachPoster = (path, size = 200) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

const typeDefs = gql`
  type Query {
    upcoming: [Upcoming]
    topRated: [TopRated]
    moviesSearch(query: String!): [MoviesSearch]
    movieInfo(id: ID!): MovieInfo
  }

  type Upcoming {
    id: ID!
    title: String!
    release_date: String!
    poster_path: String
  }

  type TopRated {
    id: ID!
    title: String!
    vote_average: Float!
    poster_path: String
  }

  type MoviesSearch {
    id: ID!
    title: String!
    release_date: String!
    poster_path: String
  }

  type SimilarMovies {
    id: ID!
    title: String!
    release_date: String!
    poster_path: String
  }

  type MovieInfo {
    id: ID!
    title: String!
    release_date: String!
    vote_average: String!
    budget: String!
    revenue: String!
    overview: String!
    poster_path: String
    backdrop_path: String
    similarMovies: [SimilarMovies]
  }
`;

const resolvers = {
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
        params: { query }
      });
      return data.results.slice(0, 6);
    },
    movieInfo: async (_, { id }) => {
      const { data } = await moviesApi.get(`/movie/${id}`);
      return data;
    }
  },
  Upcoming: {
    poster_path: ({ poster_path }) => attachPoster(poster_path)
  },
  TopRated: {
    poster_path: ({ poster_path }) => attachPoster(poster_path)
  },
  MoviesSearch: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path)
  },
  SimilarMovies: {
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path)
  },
  MovieInfo: {
    backdrop_path: ({ backdrop_path }) =>
      backdrop_path && attachPoster(backdrop_path, 500),
    poster_path: ({ poster_path }) => poster_path && attachPoster(poster_path),
    similarMovies: async ({ id }) => {
      const { data } = await moviesApi.get(`/movie/${id}/similar`);
      return data.results.slice(0, 6);
    }
  }
};

module.exports = { typeDefs, resolvers };
