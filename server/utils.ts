export const paginateResults = (
  data: any,
  cursor?: number | null,
  pageSize = 4
) => {
  let results = [];

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
