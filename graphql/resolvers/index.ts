import { Resolvers } from '../types';
import { paginateResults } from '../lib/utils';

const resolvers: Resolvers = {
  Query: {
    upcoming: async (_root, { page }, { dataSources }) => {
      try {
        const data = await dataSources.moviesAPI.getUpcoming(page);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    topRated: async (_root, { page }, { dataSources }) => {
      try {
        const data = await dataSources.moviesAPI.getTopRated(page);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    moviesSearch: async (
      _root,
      { query, cursor, pageSize },
      { dataSources },
    ) => {
      try {
        const data = await dataSources.moviesAPI.getMoviesSearch(query);
        return paginateResults(data, pageSize, cursor);
      } catch (error) {
        throw new Error(error);
      }
    },
    movieInfo: async (_root, { id, cursor, pageSize }, { dataSources }) => {
      try {
        const data = await dataSources.moviesAPI.getMovieInfo(id);
        return {
          ...data,
          similar: paginateResults(data.similar, pageSize, cursor),
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default resolvers;
