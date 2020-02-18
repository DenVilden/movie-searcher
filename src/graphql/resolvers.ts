import ApolloCache, {
  Resolvers,
  NormalizedCacheObject,
  gql,
} from 'apollo-boost';
import { GET_FAVORITES_DATA, GET_INPUT_VALUE } from './queries';
import GetMovieInfo from '../types/GetMovieInfo';

export const typeDefs = gql`
  extend type Mutation {
    addMovieToFavorites(movie: MovieInfo!): [MovieInfo!]!
    removeMovieFromFavorites(movie: MovieInfo!): [MovieInfo!]!
    setInputValue(value: String!): String!
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<NormalizedCacheObject> }
) => any;

interface ApolloResolvers extends Resolvers {
  Mutation: {
    [field: string]: ResolverFn;
  };
}

export const resolvers: ApolloResolvers = {
  Mutation: {
    addMovieToFavorites: (_, { movie }: { movie: GetMovieInfo }, { cache }) => {
      const queryResult = cache.readQuery<{ favorites: GetMovieInfo[] }>({
        query: GET_FAVORITES_DATA,
      });

      if (queryResult) {
        const { favorites } = queryResult;

        const newFavorites = [...favorites, movie];

        cache.writeQuery({
          query: GET_FAVORITES_DATA,
          data: { favorites: newFavorites },
        });
        return newFavorites;
      }
      return [];
    },
    removeMovieFromFavorites: (
      _,
      { movie }: { movie: GetMovieInfo },
      { cache }
    ) => {
      const queryResult = cache.readQuery<{ favorites: GetMovieInfo[] }>({
        query: GET_FAVORITES_DATA,
      });

      if (queryResult) {
        const { favorites } = queryResult;

        const newFavorites = favorites.filter(
          favorite => favorite.id !== movie.id
        );

        cache.writeQuery({
          query: GET_FAVORITES_DATA,
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
