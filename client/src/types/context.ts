import ApolloCache, { NormalizedCacheObject } from 'apollo-boost';

export interface Context {
  cache: ApolloCache<NormalizedCacheObject>;
}
