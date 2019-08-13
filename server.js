const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  dotenv.config();
}

const { typeDefs, resolvers } = require('./schema/schema.js');

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});
