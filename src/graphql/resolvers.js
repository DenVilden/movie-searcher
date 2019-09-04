import { GET_FAVORITES, GET_INPUT_VALUE, GET_FAVORITES_STATE } from './queries';

export default {
  Mutation: {
    toggleFavoritesOpen: (_, __, { cache }) => {
      const { favoritesOpen } = cache.readQuery({
        query: GET_FAVORITES_STATE,
      });

      cache.writeQuery({
        query: GET_FAVORITES_STATE,
        data: { favoritesOpen: !favoritesOpen },
      });

      return !favoritesOpen;
    },

    addMovieToFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES,
      });

      const newFavorites = [...favorites, movie];

      cache.writeQuery({
        query: GET_FAVORITES,
        data: { favorites: newFavorites },
      });

      return newFavorites;
    },

    removeMovieFromFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES,
      });

      const newFavorites = favorites.filter(
        favorite => favorite.id !== movie.id
      );

      cache.writeQuery({
        query: GET_FAVORITES,
        data: { favorites: newFavorites },
      });

      return newFavorites;
    },

    setInputValue: (_, { value = '' }, { cache }) => {
      cache.writeQuery({
        query: GET_INPUT_VALUE,
        data: { inputValue: value },
      });

      return value;
    },
  },
};
