const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const enforce = require('express-sslify');

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  dotenv.config();
}

app.get('/service-worker.js', (req, res) => {
  res.send(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

const { typeDefs, resolvers } = require('./schema/schema.js');

const server = new ApolloServer({ cors: true, typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});
