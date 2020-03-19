import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { createMuiTheme, CssBaseline, StylesProvider } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { loader } from 'graphql.macro';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import resolvers from '../graphql/resolvers';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

export const theme = createMuiTheme();

export default class NextApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <title>Movie Searcher</title>
        </Head>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </>
    );
  }
}

export const createApolloClient = (
  initialState: NormalizedCacheObject,
  ctx: NextPageContext | undefined
) => {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  const client = new ApolloClient({
    typeDefs: loader('../graphql/schema.graphql'),
    resolvers,
    ssrMode: Boolean(ctx),
    uri: process.env.SERVER_URL,
    link: new HttpLink({
      uri: process.env.SERVER_URL,
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
  client.writeQuery({
    query: gql`
      {
        favorites
        inputValue
      }
    `,
    data: { favorites: [], inputValue: '' },
  });
  return client;
};
