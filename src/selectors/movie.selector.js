import { createSelector } from 'reselect';

const selectMovie = state => state.movie;

export const selectMovieData = createSelector(
  selectMovie,
  movie => movie.data
);

export const selectMovieFetching = createSelector(
  selectMovie,
  movie => movie.isFetching
);
