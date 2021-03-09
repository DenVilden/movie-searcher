import { Resolvers } from 'apollo/__generated__';

function paginateResults(data: any, size = 2, cursor: number | null) {
  let results = [];

  if (!cursor) {
    results = data.results.slice(0, size);
  } else {
    results = data.results.slice(0, cursor + size);
  }

  return {
    ...data,
    cursor: results.length,
    hasMore: results.length !== data.results.length,
    results,
  };
}

const resolvers: Resolvers = {
  Query: {
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
    async moviesSearch(_root, { query, cursor, pageSize }, { dataSources }) {
      try {
        const data = await dataSources.moviesAPI.getMoviesSearch(query);
        return paginateResults(data, pageSize, cursor);
      } catch (error) {
        throw new Error(error);
      }
    },
    async nowPlaying(_root, { page }, { dataSources }) {
      try {
        const data = await dataSources.moviesAPI.getNowPlaying(page);

        if (!data.results.length || data.page !== +page) {
          throw new Error('404 Not found');
        }

        return data;
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
    async upcoming(_root, { page }, { dataSources }) {
      try {
        const data = await dataSources.moviesAPI.getUpcoming(page);

        if (!data.results.length || data.page !== +page) {
          throw new Error('404 Not found');
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default resolvers;