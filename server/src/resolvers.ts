import { Resolvers } from './generated/types';
import { paginateResults } from './utils';

export default {
  Query: {
    upcoming: (_, { page }, { dataSources }) => {
      return dataSources.moviesAPI.getUpcoming(page);
    },
    topRated: (_, { page }, { dataSources }) => {
      return dataSources.moviesAPI.getTopRated(page);
    },
    moviesSearch: async (_, { query, cursor, pageSize }, { dataSources }) => {
      const data = await dataSources.moviesAPI.getMoviesSearch(query);
      return paginateResults(data, pageSize, cursor);
    },
    movieInfo: async (_, { id, cursor, pageSize }, { dataSources }) => {
      const data = await dataSources.moviesAPI.getMovieInfo(id);
      return {
        ...data,
        similar: paginateResults(data.similar, pageSize, cursor),
      };
    },
  },
} as Resolvers;
