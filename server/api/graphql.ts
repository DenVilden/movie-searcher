import { ApolloServer } from 'apollo-server-micro';
import microCors from 'micro-cors';
import typeDefs from '../src/graphql/schema';
import resolvers from '../src/graphql/resolvers';
import MoviesAPI from '../src/datasources/Movies';

const { MOVIE_API_KEY, CLIENT_URL } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ moviesAPI: new MoviesAPI() }),
  context: { key: MOVIE_API_KEY },
  introspection: true,
  playground: true,
});

const handler = server.createHandler({ path: '/api/graphql' });

const cors = microCors({ origin: CLIENT_URL });

export default cors(handler);
