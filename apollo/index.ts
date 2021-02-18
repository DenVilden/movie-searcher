import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useMemo } from 'react';
import { SimilarMovies } from '../__generated__';

export type Favorites = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  budget?: string;
  revenue?: string;
  overview?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  number_of_seasons?: number;
  number_of_episodes?: number;
  media_type: string;
  similar: SimilarMovies;
};

export const favoritesVar = makeVar<Favorites[]>([]);

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
