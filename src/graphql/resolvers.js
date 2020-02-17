import { GET_FAVORITES_DATA, GET_INPUT_VALUE } from './queries';

export default {
  Mutation: {
    addMovieToFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES_DATA,
      });
      const newFavorites = [...favorites, movie];

      cache.writeQuery({
        query: GET_FAVORITES_DATA,
        data: { favorites: newFavorites },
      });

      return newFavorites;
    },
    removeMovieFromFavorites: (_, { movie }, { cache }) => {
      const { favorites } = cache.readQuery({
        query: GET_FAVORITES_DATA,
      });
      const newFavorites = favorites.filter(
        favorite => favorite.id !== movie.id
      );

      cache.writeQuery({
        query: GET_FAVORITES_DATA,
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
