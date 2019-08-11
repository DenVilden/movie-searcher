/* eslint-disable camelcase */
import graphql from 'graphql';
import moviesApi from './movie-database.js';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const attachPoster = (path, quality = 200) => {
  // eslint-disable-next-line no-param-reassign
  path = `https://image.tmdb.org/t/p/w${quality}${path}`;
  return path;
};

const MoviesUpcomingType = new GraphQLObjectType({
  name: 'MoviesUpcoming',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    release_date: { type: GraphQLString },
    poster_path: {
      type: GraphQLString,
      resolve: ({ poster_path }) => attachPoster(poster_path)
    }
  }
});

const MoviesTopRatedType = new GraphQLObjectType({
  name: 'MoviesTopRated',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    vote_average: { type: GraphQLString },
    poster_path: {
      type: GraphQLString,
      resolve: ({ poster_path }) => attachPoster(poster_path)
    }
  }
});

const MoviesSearchType = new GraphQLObjectType({
  name: 'MoviesSearch',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    release_date: { type: GraphQLString },
    poster_path: {
      type: GraphQLString,
      resolve: ({ poster_path }) => attachPoster(poster_path)
    }
  }
});

const MovieInfoType = new GraphQLObjectType({
  name: 'MovieInfo',
  fields: {
    id: { type: GraphQLInt },
    budget: { type: GraphQLInt },
    title: { type: GraphQLString },
    revenue: { type: GraphQLString },
    release_date: { type: GraphQLString },
    vote_average: { type: GraphQLString },
    overview: { type: GraphQLString },
    backdrop_path: {
      type: GraphQLString,
      resolve: ({ backdrop_path }) => attachPoster(backdrop_path, 500)
    }
  }
});

const MoviesSimilarType = new GraphQLObjectType({
  name: 'MoviesSimilar',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    release_date: { type: GraphQLString },
    poster_path: {
      type: GraphQLString,
      resolve: ({ poster_path }) => attachPoster(poster_path)
    }
  }
});

const MovieSearcherRootQuery = new GraphQLObjectType({
  name: 'MovieSearcherSchema',
  fields: {
    moviesUpcoming: {
      type: new GraphQLList(MoviesUpcomingType),
      resolve: () =>
        moviesApi.get('/movie/upcoming').then(({ data }) => data.results)
    },
    moviesTopRated: {
      type: new GraphQLList(MoviesTopRatedType),
      resolve: () =>
        moviesApi.get('/movie/top_rated').then(({ data }) => data.results)
    },
    moviesSearch: {
      type: new GraphQLList(MoviesSearchType),
      args: { query: { type: GraphQLString } },
      resolve: (value, { query }) =>
        moviesApi
          .get('/search/movie', { params: { query } })
          .then(({ data }) => data.results.length && data.results)
    },
    movieInfo: {
      type: new GraphQLNonNull(MovieInfoType),
      args: { id: { type: GraphQLInt } },
      resolve: (value, { id }) =>
        moviesApi.get(`/movie/${id}`).then(({ data }) => data)
    },
    moviesSimilar: {
      type: new GraphQLList(MoviesSimilarType),
      args: { id: { type: GraphQLInt } },
      resolve: (value, { id }) =>
        moviesApi
          .get(`/movie/${id}/similar`)
          .then(({ data }) => data.results.length && data.results)
    }
  }
});

export default new GraphQLSchema({
  query: MovieSearcherRootQuery
});
