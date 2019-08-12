import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema/schema';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile('build/index.html');
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});
