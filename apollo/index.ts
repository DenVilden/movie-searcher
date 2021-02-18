import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useMemo } from 'react';
import { MovieInfo } from '../graphql/types';

export const favoritesVar = makeVar<MovieInfo[]>([]);

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any = null) {
  const internalApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    internalApolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return internalApolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = internalApolloClient;

  return internalApolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

export * from './queries.generated';
