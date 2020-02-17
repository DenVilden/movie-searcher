const path = require('path');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const { ApolloServer } = require('apollo-server-express');
const enforce = require('express-sslify');
const compression = require('compression');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const MoviesAPI = require('./datasources/movies');

const app = express();
const port = process.env.PORT || 5000;

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
  typeDefs,
  resolvers,
  dataSources: () => ({
    moviesAPI: new MoviesAPI(),
  }),
});
server.applyMiddleware({ app });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});
