import { createSelector } from 'reselect';

const selectMovies = state => state.movies;

export const selectMoviesData = createSelector(
  selectMovies,
  movies => movies.data
);

export const selectMoviesFetching = createSelector(
  selectMovies,
  movies => movies.isFetching
);
