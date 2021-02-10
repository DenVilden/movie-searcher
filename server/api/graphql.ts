import { ApolloServer } from 'apollo-server-micro';
import microCors from 'micro-cors';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import MoviesAPI from '../datasource';

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

export default cors((req, res) =>
  req.method === 'OPTIONS' ? res.end() : handler(req, res),
);
