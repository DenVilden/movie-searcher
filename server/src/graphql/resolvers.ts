import { Resolvers } from "./__generated__";
import { paginateResults } from "../lib/utils";

const resolvers: Resolvers = {
  Query: {
    upcoming: (_, { page }, { dataSources }) => {
      try {
        return dataSources.moviesAPI.getUpcoming(page);
      } catch (error) {
        throw new Error(`Failed to fetch movies: ${error}`);
      }
    },
    topRated: (_, { page }, { dataSources }) => {
      try {
        return dataSources.moviesAPI.getTopRated(page);
      } catch (error) {
        throw new Error(`Failed to fetch movies ${error}`);
      }
    },
    moviesSearch: async (_, { query, cursor, pageSize }, { dataSources }) => {
      try {
        const data = await dataSources.moviesAPI.getMoviesSearch(query);
        return paginateResults(data, pageSize, cursor);
      } catch (error) {
        throw new Error(`Failed to fetch movies ${error}`);
      }
    },
    movieInfo: async (_, { id, cursor, pageSize }, { dataSources }) => {
      try {
        const data = await dataSources.moviesAPI.getMovieInfo(id);
        return {
          ...data,
          similar: paginateResults(data.similar, pageSize, cursor),
        };
      } catch (error) {
        throw new Error(`Something went wrong ${error}`);
      }
    },
  },
};

export default resolvers;
