import { createSelector } from 'reselect';

const selectUpcoming = state => state.upcoming;

export const selectUpcomingData = createSelector(
  selectUpcoming,
  upcoming => upcoming.data
);

export const selectUpcomingFetching = createSelector(
  selectUpcoming,
  upcoming => upcoming.isFetching
);

export const selectUpcomingSortByReleaseDate = createSelector(
  selectUpcomingData,
  data => data.sort((a, b) => (a.release_date < b.release_date ? 1 : -1))
);
