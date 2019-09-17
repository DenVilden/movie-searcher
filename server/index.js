const path = require('path');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const { ApolloServer } = require('apollo-server-express');
const enforce = require('express-sslify');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const port = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '../build');

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use('/', expressStaticGzip(buildPath, { enableBrotli: true }));
}

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});
