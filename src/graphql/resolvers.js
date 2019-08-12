import {
  GET_FAVORITES_STATE,
  GET_FAVORITES_DATA,
  GET_INPUT_VALUE
} from './types';

/* eslint-disable camelcase */
export default {
  Mutation: {
    toggleFavoritesOpen: (_, __, { cache }) => {
      const { favoritesOpen } = cache.readQuery({
        query: GET_FAVORITES_STATE
      });

      cache.writeQuery({
        query: GET_FAVORITES_STATE,
        data: { favoritesOpen: !favoritesOpen }
      });
    },

    addMovieToFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES_DATA
      });

      cache.writeQuery({
        query: GET_FAVORITES_DATA,
        data: { favorites: [...favorites, movie] }
      });
    },

    removeMovieFromFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES_DATA
      });

      cache.writeQuery({
        query: GET_FAVORITES_DATA,
        data: {
          favorites: favorites.filter(favorite => favorite.id !== movie.id)
        }
      });
    },

    setInputValue: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: GET_INPUT_VALUE,
        data: { inputValue: value }
      });
    },

    clearInputValue: (_, __, { cache }) => {
      cache.writeQuery({
        query: GET_INPUT_VALUE,
        data: { inputValue: '' }
      });
    }
  }
};
