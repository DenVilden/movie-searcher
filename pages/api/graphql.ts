import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../graphql/schema';
import resolvers from '../../graphql/resolvers';
import MoviesAPI from '../../graphql/datasource';

const server = new ApolloServer({
  typeDefs,
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
