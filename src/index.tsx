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
import App from './App';
import * as serviceWorker from './serviceWorker';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  typeDefs,
  resolvers,
  cache,
});
client.writeData({ data: { favorites: [], inputValue: '' } });

(async () => {
  if (process.env.NODE_ENV === 'production') {
    await persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    });
  }

  const theme = createMuiTheme();

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
