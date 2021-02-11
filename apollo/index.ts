import { makeVar } from '@apollo/client';
import { MovieInfo } from '../__generated__';

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  require('cross-fetch/polyfill');
}

export const favoritesVar = makeVar<MovieInfo[]>([]);
export const autocompleteVar = makeVar<string>('');

export * from './client';
