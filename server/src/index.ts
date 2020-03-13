import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers';
import MoviesAPI from './datasources/Movies';

const { CLIENT_URL, PORT, MOVIE_API_KEY } = process.env;

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  dataSources: () => ({
    moviesAPI: new MoviesAPI(),
  }),
  context: () => ({
    key: MOVIE_API_KEY,
  }),
  cors: { origin: CLIENT_URL, credentials: true },
});

server.listen(PORT).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at ${url}`);
});
