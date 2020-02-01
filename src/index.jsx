import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist-dev';
import App from './routes/App';
import * as serviceWorker from './serviceWorker';
import { data, resolvers } from './graphql/clientState';

const cache = new InMemoryCache();

const client = new ApolloClient({ resolvers, cache });
client.writeData({ data });

const renderApp = async () => {
  if (process.env.NODE_ENV === 'production') {
    await persistCache({ cache, storage: window.localStorage });
    client.writeData({ data: { favoritesOpen: false } });
  }

  const theme = createMuiTheme();

  render(
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );

  serviceWorker.register();
};

renderApp();
