import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist-dev';
import App from './App';
import * as serviceWorker from './serviceWorker';
import resolvers from './graphql/resolvers';

const cache = new InMemoryCache();

const client = new ApolloClient({ resolvers, cache });
client.writeData({ data: { favorites: [], inputValue: '' } });

(async () => {
  if (process.env.NODE_ENV === 'production') {
    await persistCache({ cache, storage: window.localStorage });
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
