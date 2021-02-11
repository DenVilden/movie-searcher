import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { createMuiTheme, StylesProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { Header } from '../components';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

export const theme = createMuiTheme();
export type theme = typeof theme;

const NextApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Movie searcher app" name="description" />
        <title>Movie Searcher</title>
      </Head>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default NextApp;
