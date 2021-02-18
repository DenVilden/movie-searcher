import { Resolvers } from '../types';
import { paginateResults } from '../lib/utils';

export default {
  Query: {
    async upcoming(_root, { page }, { dataSources }) {
      try {
        const data = await dataSources.moviesAPI.getUpcoming(page);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async topRated(_root, { page }, { dataSources }) {
      try {
        const data = await dataSources.moviesAPI.getTopRated(page);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async moviesSearch(_root, { query, cursor, pageSize }, { dataSources }) {
      try {
        const data = await dataSources.moviesAPI.getMoviesSearch(query);
        return paginateResults(data, pageSize, cursor);
      } catch (error) {
        throw new Error(error);
      }
    },
    async movieInfo(_root, { id, cursor, pageSize }, { dataSources }) {
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
} as Resolvers;
