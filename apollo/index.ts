import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import { ApolloClient, makeVar } from '@apollo/client/core';
import { useMemo } from 'react';
import { Favorite } from 'lib/types';

export const favoritesVar = makeVar<Favorite[]>([]);
export const prefersDarkModeVar = makeVar(false);

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
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
