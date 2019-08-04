import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  TOGGLE_FAVORITES_OPEN
} from '../constants/favorites.types';

export const toggleFavoritesOpen = () => ({
  type: TOGGLE_FAVORITES_OPEN
});

export const addToFavorites = movie => ({
  type: ADD_TO_FAVORITES,
  payload: movie
});

export const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id
});
