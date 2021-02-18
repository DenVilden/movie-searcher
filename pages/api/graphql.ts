import { ApolloServer } from 'apollo-server-micro';
import { loader } from 'graphql.macro';
import resolvers from '../../graphql/resolvers';
import MoviesAPI from '../../graphql/datasource';

const server = new ApolloServer({
  typeDefs: loader('../../graphql/schema.graphql'),
  resolvers,
  dataSources: () => ({ moviesAPI: new MoviesAPI() }),
  context: { key: process.env.MOVIE_API_KEY },
  introspection: true,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
