export function paginateResults(data: any, size = 4, cursor: number | null) {
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

export function attachPoster(path: string, size = 200) {
  return path ? `https://image.tmdb.org/t/p/w${size}${path}` : null;
}
