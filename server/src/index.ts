import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers';
import MoviesAPI from './datasources/Movies';

const app = express();
const port = process.env.PORT;

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  dataSources: () => ({
    moviesAPI: new MoviesAPI(),
  }),
  context: () => ({
    key: process.env.MOVIE_API_KEY,
  }),
});

server.applyMiddleware({
  app,
  cors: { origin: process.env.URL, credentials: true },
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
