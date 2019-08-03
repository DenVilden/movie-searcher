import { createSelector } from 'reselect';
import { selectMovieData } from './movie.selector';

const selectFavorites = state => state.favorites;

export const selectFavoritesData = createSelector(
  selectFavorites,
  favorites => favorites.data
);

export const selectFavoritesOpen = createSelector(
  selectFavorites,
  favorites => favorites.open
);

export const selectFavoritesIsMovieExist = createSelector(
  [selectFavoritesData, selectMovieData],
  (favorites, movie) => favorites.some(favorite => favorite.id === movie.id)
);
