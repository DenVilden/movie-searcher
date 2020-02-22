import {
  Resolvers,
  Upcoming,
  TopRated,
  MoviesSearch,
  MovieInfo,
} from './types/types';
import { paginateResults } from './utils';

const resolvers: Resolvers = {
  Query: {
    upcoming: async (_, { page }, { dataSources }) => {
      const data: Upcoming = await dataSources.moviesAPI.getUpcoming(page);
      return data;
    },
    topRated: async (_, { page }, { dataSources }) => {
      const data: TopRated = await dataSources.moviesAPI.getTopRated(page);
      return data;
    },
    moviesSearch: async (_, { query, cursor }, { dataSources }) => {
      const data: MoviesSearch = await dataSources.moviesAPI.getMoviesSearch(
        query
      );
      return paginateResults(data, cursor);
    },
    movieInfo: async (_, { id }, { dataSources }) => {
      const data: MovieInfo = await dataSources.moviesAPI.getMovieInfo(id);
      return data;
    },
  },
  MovieInfo: {
    similar_results: ({ similar_results }) => similar_results.slice(0, 4),
  },
};

export default resolvers;
