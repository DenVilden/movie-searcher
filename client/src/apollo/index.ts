import { ApolloClient, InMemoryCache, HttpLink, makeVar } from "@apollo/client";
import { withApollo } from "next-apollo";
import { MovieInfo } from "./__generated__";

if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line global-require
  require("cross-fetch/polyfill");
}

export const favoritesVar = makeVar<MovieInfo[]>([]);
export const autocompleteVar = makeVar<string>("");

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

export default withApollo(client);

export * from "./__generated__";
