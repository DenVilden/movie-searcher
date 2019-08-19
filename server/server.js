const path = require('path');
const express = require('express');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const enforce = require('express-sslify');
const typeDefs = require('./schema.graphql');
const resolvers = require('./resolvers.js');

const app = express();
const buildPath = path.resolve(__dirname, '..', 'build');
const port = process.env.PORT || 5000;

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.resolve(buildPath)));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });
}

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});
