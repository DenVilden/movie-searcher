import { ApolloClient, InMemoryCache, HttpLink, makeVar } from "@apollo/client";
import { withApollo } from "next-apollo";
import { MovieInfo } from "../graphql";

if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line global-require
  require("cross-fetch/polyfill");
}

export const favoritesVar = makeVar<MovieInfo[]>([]);
export const autocompleteVar = makeVar<string>("");

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

export default withApollo(client)({ ssr: true });
