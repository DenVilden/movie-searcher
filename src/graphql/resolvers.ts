import ApolloCache, {
  Resolvers,
  NormalizedCacheObject,
  gql,
} from 'apollo-boost';
import { GET_FAVORITES, GET_INPUT_VALUE } from './queries';
import { GetFavorites } from './__generated__/GetFavorites';
import { GetMovieInfo_movieInfo } from './__generated__/GetMovieInfo';

export const typeDefs = gql`
  extend type Query {
    inputValue: String!
    favorites: [String!]!
  }

  extend type MovieInfo {
    isInFavorites: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromFavorites(id: String!): [String!]!
    setInputValue(value: String!): String!
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<NormalizedCacheObject> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface ApolloResolvers extends Resolvers {
  Mutation: ResolverMap;
  MovieInfo: ResolverMap;
}

export const resolvers: ApolloResolvers = {
  MovieInfo: {
    isInFavorites: (movie: GetMovieInfo_movieInfo, __, { cache }): boolean => {
      const queryResult = cache.readQuery<GetFavorites>({
        query: GET_FAVORITES,
      });

      if (queryResult) {
        return queryResult.favorites.includes(movie.id.toString());
      }
      return false;
    },
  },
  Mutation: {
    addOrRemoveFromFavorites: (
      _,
      { id }: { id: string },
      { cache }
    ): string[] => {
      const queryResult = cache.readQuery<GetFavorites>({
        query: GET_FAVORITES,
      });

      if (queryResult) {
        const { favorites } = queryResult;

        const newFavorites = favorites.includes(id)
          ? favorites.filter(favId => favId !== id)
          : [...favorites, id];

        cache.writeQuery({
          query: GET_FAVORITES,
          data: { favorites: newFavorites },
        });
        return newFavorites;
      }
      return [];
    },
    setInputValue: (_, { value }: { value: string }, { cache }): string => {
      cache.writeQuery({
        query: GET_INPUT_VALUE,
        data: { inputValue: value },
      });
      return value;
    },
  },
};
