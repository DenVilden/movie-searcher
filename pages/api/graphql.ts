import { ApolloServer } from 'apollo-server-micro';
import { loader } from 'graphql.macro';

import resolvers from 'graphql/resolvers';
import MoviesAPI from 'graphql/datasource';

export type Context = {
  dataSources: {
    moviesAPI: MoviesAPI;
  };
};

const server = new ApolloServer({
  dataSources: () => ({ moviesAPI: new MoviesAPI() }),
  introspection: true,
  playground: true,
  resolvers,
  typeDefs: loader('graphql/schema.gql'),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
