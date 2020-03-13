import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { createMuiTheme, CssBaseline, StylesProvider } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, {
  NormalizedCacheObject,
  InMemoryCache,
} from 'apollo-boost';
import withApollo from 'next-with-apollo';
import { loader } from 'graphql.macro';
import resolvers from '../graphql/resolvers';
import Layout from '../containers/Layout';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

export const theme = createMuiTheme();

class NextApp extends App<{
  apollo: ApolloClient<NormalizedCacheObject>;
}> {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, apollo } = this.props;

    return (
      <>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
          <link href="/favicon.ico" rel="shortcut icon" />
          <link href="https://image.tmdb.org" rel="preconnect" />
          <title>Movie Searcher</title>
        </Head>
        <ApolloProvider client={apollo}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Layout>
                <CssBaseline />
                <GlobalStyle />
                <Component />
              </Layout>
            </ThemeProvider>
          </StylesProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(({ initialState }) => {
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    typeDefs: loader('../graphql/schema.graphql'),
    resolvers,
    uri: process.env.REACT_APP_SERVER_URL,
    cache: new InMemoryCache().restore(initialState || {}),
  });
  client.writeData({ data: { favorites: [], inputValue: '' } });
  return client;
})(NextApp);
