import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'jss';
import { createMuiTheme } from '@material-ui/core';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
/* eslint-disable import/no-extraneous-dependencies */
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './routes/App';
import { typeDefs, resolvers } from './graphql/resolvers';
import data from './graphql/initialData';

const link = createHttpLink();
const cache = new InMemoryCache();

const waitOnCache = persistCache({ cache, storage: window.localStorage });

const client = new ApolloClient({ link, cache, typeDefs, resolvers });
client.writeData({ data });

const theme = createMuiTheme();

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')
});

waitOnCache.then(() =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <ApolloProvider client={client}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>,
    document.getElementById('root')
  )
);
