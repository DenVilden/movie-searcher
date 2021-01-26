import { ApolloClient, InMemoryCache, HttpLink, makeVar } from "@apollo/client";
import { withApollo } from "next-apollo";

if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line global-require
  require("cross-fetch/polyfill");
}

export const favoritesVar = makeVar<string[]>([]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "same-origin",
  }),
  cache,
});

export default withApollo(client)({ ssr: true });
