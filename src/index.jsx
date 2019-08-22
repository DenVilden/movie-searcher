import React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'jss';
import { createMuiTheme } from '@material-ui/core';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import App from './routes/App.container';
import * as serviceWorker from './serviceWorker';
import resolvers from './graphql/resolvers';
import data from './graphql/initialData';

const client = new ApolloClient({ resolvers });
client.writeData({ data });

const theme = createMuiTheme();

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <AppComponent />
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById('root'));

serviceWorker.register();
