import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { StylesProvider, CssBaseline, LinearProgress } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import { Header } from '../components';
import { theme } from '../utils/theme';
import { useApollo } from '../apollo';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

const NextApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
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
};

export default NextApp;
