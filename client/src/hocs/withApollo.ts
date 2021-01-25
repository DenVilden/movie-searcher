import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { loader } from "graphql.macro";
import { withApollo } from "next-apollo";
import resolvers from "../graphql/resolvers";

const client = new ApolloClient({
  typeDefs: loader("../graphql/schema.graphql"),
  resolvers,
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

client.writeQuery({
  query: gql`
    {
      favorites
    }
  `,
  data: { favorites: [] },
});

export default withApollo(client);
