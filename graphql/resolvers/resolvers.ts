import { Resolvers } from '../../__generated__';
import { paginateResults } from '../lib/utils';
import MoviesAPI from '../datasource/movies';

interface Context {
  dataSources: {
    moviesAPI: MoviesAPI;
  };
}

const resolvers: Resolvers<Context> = {
  Query: {
    async upcoming(_root, { page }, { dataSources }) {
      try {
        return await dataSources.moviesAPI.getUpcoming(page);
      } catch (error) {
        throw new Error(error);
      }
    },
    async nowPlaying(_root, { page }, { dataSources }) {
      try {
        return await dataSources.moviesAPI.getNowPlaying(page);
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
    async tvShowInfo(_root, { id, cursor, pageSize }, { dataSources }) {
      try {
        const data = await dataSources.moviesAPI.getTvShowInfo(id);
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