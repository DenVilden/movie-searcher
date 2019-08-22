import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';
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

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppComponent />
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById('root'));

serviceWorker.register();
