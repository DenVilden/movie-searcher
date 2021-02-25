import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import { LinearProgress, StylesProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { useApollo } from '../apollo';
import { Header } from '../components';
import { theme } from '../lib/theme';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

export default function NextApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title key="title">Movie Searcher</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <Header />
            {loading ? (
              <LinearProgress color="secondary" />
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    </>
  );
}
