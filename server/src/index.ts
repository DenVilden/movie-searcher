import { ApolloServer } from "apollo-server";
import { loadFiles } from "graphql-import-files";
import resolvers from "./graphql/resolvers";
import MoviesAPI from "./datasources/Movies";

const { CLIENT_URL, PORT, MOVIE_API_KEY } = process.env;

(async () => {
  const server = new ApolloServer({
    typeDefs: loadFiles("./src/graphql/schema.graphql"),
    resolvers,
    dataSources: () => ({ moviesAPI: new MoviesAPI() }),
    context: { key: MOVIE_API_KEY },
    cors: { origin: CLIENT_URL, credentials: true },
  });

  const { url } = await server.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`Running a GraphQL API server at ${url}`);
})();
