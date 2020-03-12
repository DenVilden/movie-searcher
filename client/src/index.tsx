import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, {
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist-dev';
import {
  PersistentStorage,
  PersistedData,
} from 'apollo-cache-persist-dev/types';
import { loader } from 'graphql.macro';
import App from './App';
import * as serviceWorker from './serviceWorker';
import resolvers from './graphql/resolvers';

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  typeDefs: loader('./graphql/schema.graphql'),
  resolvers,
  cache,
  uri: process.env.REACT_APP_URL,
});
client.writeData({ data: { favorites: [], inputValue: '' } });

// eslint-disable-next-line import/prefer-default-export
export const theme = createMuiTheme();

(async () => {
  if (process.env.NODE_ENV === 'production') {
    await persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    });
  }

  render(
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
})();

serviceWorker.register();
