import ApolloCache, {
  Resolvers,
  NormalizedCacheObject,
  gql,
} from 'apollo-boost';
import { GET_FAVORITES, GET_INPUT_VALUE } from './queries';
import { GetFavorites } from './__generated__/GetFavorites';

export const typeDefs = gql`
  extend type Query {
    inputValue: String!
    favorites: [String!]!
  }

  extend type Mutation {
    addOrRemoveFromFavorites(movieId: String!): [String!]!
    setInputValue(value: String!): String!
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<NormalizedCacheObject> }
) => any;

interface ApolloResolvers extends Resolvers {
  Mutation: { [field: string]: ResolverFn };
}

export const resolvers: ApolloResolvers = {
  Mutation: {
    addOrRemoveFromFavorites: (
      _,
      { movieId }: { movieId: string },
      { cache }
    ) => {
      const queryResult = cache.readQuery<GetFavorites>({
        query: GET_FAVORITES,
      });

      if (queryResult) {
        const { favorites } = queryResult;

        const newFavorites = favorites.includes(movieId)
          ? favorites.filter(id => id !== movieId)
          : [...favorites, movieId];

        cache.writeQuery({
          query: GET_FAVORITES,
          data: { favorites: newFavorites },
        });
        return newFavorites;
      }
      return [];
    },
    setInputValue: (_, { value }: { value: string }, { cache }) => {
      cache.writeQuery({
        query: GET_INPUT_VALUE,
        data: { inputValue: value },
      });
      return value;
    },
  },
};
