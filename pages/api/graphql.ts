import { ApolloServer } from 'apollo-server-micro';
import { loader } from 'graphql.macro';
import resolvers from '../../graphql/resolvers';
import MoviesAPI from '../../graphql/datasource';

const server = new ApolloServer({
  typeDefs: loader('../../graphql/schema.gql'),
  resolvers,
  dataSources: () => ({ moviesAPI: new MoviesAPI() }),
  introspection: true,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
