import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema/schema';

const app = express();
const port = process.env.PORT || 5000;

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/build'));
  app.get('*', (req, res) => {
    res.sendFile('/build/index.html');
  });
}

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
