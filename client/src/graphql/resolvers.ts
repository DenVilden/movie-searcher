import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  GetFavoritesQuery,
  GetFavoritesDocument,
  Resolvers,
} from "./__generated__";

const resolvers: Resolvers<ApolloClient<NormalizedCacheObject>> = {
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
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id];

      cache.writeQuery({
        query: GetFavoritesDocument,
        data: { favorites: newFavorites },
      });

      return newFavorites;
    },
  },
};

export default resolvers;
