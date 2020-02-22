import { MoviesSearch, MoviesSearchResults } from './types/types';

export const paginateResults = (
  data: MoviesSearch,
  cursor: number | null | undefined,
  pageSize = 4
) => {
  let results: MoviesSearchResults[] = [];

  if (!cursor) {
    results = data.results.slice(0, pageSize);
  } else {
    results = data.results.slice(0, cursor + pageSize);
  }

  return {
    ...data,
    results,
    cursor: results.length,
    hasMore: results.length !== data.results.length,
  };
};
