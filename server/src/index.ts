import { ApolloServer } from 'apollo-server';
import { loadFiles } from 'graphql-import-files';
import resolvers from './graphql/resolvers';
import MoviesAPI from './datasources/Movies';

const { CLIENT_URL, PORT, MOVIE_API_KEY } = process.env;

const server = new ApolloServer({
  typeDefs: loadFiles('./src/graphql/schema.graphql'),
  resolvers,
  dataSources: () => ({ moviesAPI: new MoviesAPI() }),
  context: { key: MOVIE_API_KEY },
  cors: { origin: CLIENT_URL, credentials: true },
  introspection: true,
  playground: true,
});

server.listen(PORT).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at ${url}`);
});
