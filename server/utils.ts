export const paginateResults = (
  data: any,
  cursor: number | null | undefined,
  pageSize = 8
) => {
  let results = [];

  if (!cursor) {
    results = data.results.slice(0, pageSize);
  } else {
    results = data.results;
  }

  return {
    ...data,
    results,
    cursor: results.length,
    hasMore: results.length !== data.results.length,
  };
};
