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
    moviesSearch: async (_, { query, cursor, pageSize }, { dataSources }) => {
      const data: MoviesSearch = await dataSources.moviesAPI.getMoviesSearch(
        query
      );
      return paginateResults(data, cursor, pageSize);
    },
    movieInfo: async (_, { id, cursor, pageSize }, { dataSources }) => {
      const data: MovieInfo = await dataSources.moviesAPI.getMovieInfo(id);
      return {
        ...data,
        similar: paginateResults(data.similar, cursor, pageSize),
      };
    },
  },
};

export default resolvers;
