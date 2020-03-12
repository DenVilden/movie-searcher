import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { loader } from 'graphql.macro';
import App from './App';
import * as serviceWorker from './serviceWorker';
import resolvers from './graphql/resolvers';

const client = new ApolloClient({
  typeDefs: loader('./graphql/schema.graphql'),
  resolvers,
  uri: process.env.REACT_APP_SERVER_URL,
});
client.writeData({ data: { favorites: [], inputValue: '' } });

// eslint-disable-next-line import/prefer-default-export
export const theme = createMuiTheme();

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

serviceWorker.register();
