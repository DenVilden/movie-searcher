import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers';
import MoviesAPI from './datasources/Movies';

const { CLIENT_URL, PORT } = process.env;

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  dataSources: () => ({
    moviesAPI: new MoviesAPI(),
  }),
  context: () => ({
    key: process.env.MOVIE_API_KEY,
  }),
  cors: { origin: CLIENT_URL, credentials: true },
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at ${CLIENT_URL}`);
});
