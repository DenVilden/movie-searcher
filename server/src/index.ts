import path from 'path';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import enforce from 'express-sslify';
import compression from 'compression';
import resolvers from './resolvers';
import MoviesAPI from './datasources/Movies';

const app = express();
const port = process.env.PORT;

const buildPath = path.join(__dirname, '../build');

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(compression());
  app.use(
    '/',
    expressStaticGzip(buildPath, {
      enableBrotli: true,
      orderPreference: ['br'],
    })
  );
  app.get('*', (_, res) => {
    res.sendFile(`${buildPath}/index.html`);
  });
}

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
server.applyMiddleware({ app });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
