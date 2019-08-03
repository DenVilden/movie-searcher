import { createSelector } from 'reselect';

const selectRated = state => state.rated;

export const selectRatedData = createSelector(
  selectRated,
  rated => rated.data
);

export const selectRatedFetching = createSelector(
  selectRated,
  rated => rated.isFetching
);
