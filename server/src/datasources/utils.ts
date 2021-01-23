/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/prefer-default-export
export const paginateResults = (data: any, size = 4, cursor: number | null) => {
  let results = [];

  if (!cursor) {
    results = data.results.slice(0, size);
  } else {
    results = data.results.slice(0, cursor + size);
  }

  return {
    ...data,
    results,
    cursor: results.length,
    hasMore: results.length !== data.results.length,
  };
};
