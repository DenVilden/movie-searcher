import {
  GetFavoritesQuery,
  GetFavoritesDocument,
  GetInputValueDocument,
} from '../__generated__';
import { Resolvers } from '../__generated__/types';

export default {
  MovieInfo: {
    isInFavorites: (movie, __, { cache }) => {
      const queryResult = cache.readQuery<GetFavoritesQuery>({
        query: GetFavoritesDocument,
      });

      return queryResult!.favorites.includes(movie.id.toString());
    },
  },
  Mutation: {
    addOrRemoveFromFavorites: (_, { id }, { cache }) => {
      const queryResult = cache.readQuery<GetFavoritesQuery>({
        query: GetFavoritesDocument,
      });

      const { favorites } = queryResult!;

      const newFavorites = favorites.includes(id)
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];

      cache.writeQuery({
        query: GetFavoritesDocument,
        data: { favorites: newFavorites },
      });

      return newFavorites;
    },
    setInputValue: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: GetInputValueDocument,
        data: { inputValue: value },
      });
      return value;
    },
  },
} as Resolvers;
