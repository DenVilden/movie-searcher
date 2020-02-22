import {
  GetFavoritesQuery,
  GetFavoritesDocument,
  GetInputValueDocument,
} from '../__generated__';
import { Resolvers } from '../types/types';

const resolvers: Resolvers = {
  MovieInfo: {
    isInFavorites: (movie, __, { cache }) => {
      const queryResult = cache.readQuery<GetFavoritesQuery>({
        query: GetFavoritesDocument,
      });

      if (queryResult) {
        return queryResult.favorites.includes(movie.results.id.toString());
      }
      return false;
    },
  },
  Mutation: {
    addOrRemoveFromFavorites: (_, { id }, { cache }) => {
      const queryResult = cache.readQuery<GetFavoritesQuery>({
        query: GetFavoritesDocument,
      });

      if (queryResult) {
        const { favorites } = queryResult;

        const newFavorites = favorites.includes(id)
          ? favorites.filter(favId => favId !== id)
          : [...favorites, id];

        cache.writeQuery({
          query: GetFavoritesDocument,
          data: { favorites: newFavorites },
        });
        return newFavorites;
      }
      return [];
    },
    setInputValue: (_, { value }, { cache }): string => {
      cache.writeQuery({
        query: GetInputValueDocument,
        data: { inputValue: value },
      });
      return value;
    },
  },
};

export default resolvers;
