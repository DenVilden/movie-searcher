import ApolloCache, { NormalizedCacheObject } from 'apollo-boost';
import {
  Resolvers,
  MovieInfoResolvers,
  GetFavoritesQuery,
  MutationResolvers,
  GetFavoritesDocument,
  GetInputValueDocument,
} from '../generated/types';

interface ApolloResolvers extends Resolvers {
  Mutation: MutationResolvers;
  MovieInfo: MovieInfoResolvers;
}

type Cache = { cache: ApolloCache<NormalizedCacheObject> };

const resolvers: ApolloResolvers = {
  MovieInfo: {
    isInFavorites: (movie, __, { cache }: Cache) => {
      const queryResult = cache.readQuery<GetFavoritesQuery>({
        query: GetFavoritesDocument,
      });

      if (queryResult) {
        return queryResult.favorites.includes(movie.id.toString());
      }
      return false;
    },
  },
  Mutation: {
    addOrRemoveFromFavorites: (_, { id }, { cache }: Cache) => {
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
    setInputValue: (_, { value }, { cache }: Cache): string => {
      cache.writeQuery({
        query: GetInputValueDocument,
        data: { inputValue: value },
      });
      return value;
    },
  },
};

export default resolvers;
