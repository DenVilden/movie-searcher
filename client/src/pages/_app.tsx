import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { createMuiTheme, CssBaseline, StylesProvider } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Layout from '../containers/Layout';

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
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
          <link href="/favicon.ico" rel="shortcut icon" />
          <link href="https://image.tmdb.org" rel="preconnect" />
          <title>Movie Searcher</title>
        </Head>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Layout>
              <CssBaseline />
              <GlobalStyle />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </StylesProvider>
      </>
    );
  }
}
