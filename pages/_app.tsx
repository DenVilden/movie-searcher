import { useEffect, useState, useMemo } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import Router from 'next/router';
import {
  LinearProgress,
  CssBaseline,
  createMuiTheme,
  useMediaQuery,
} from '@material-ui/core';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { useApollo, prefersDarkModeVar } from '../apollo';
import { Header } from '../components';

export default function NextApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [loading, setLoading] = useState(false);
  const prefersDarkMode = useReactiveVar(prefersDarkModeVar);
  const systemColorScheme = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      prefersDarkModeVar(JSON.parse(darkMode));
    } else {
      prefersDarkModeVar(systemColorScheme);
    }
  }, [systemColorScheme]);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

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
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title key="title">Movie Searcher</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </ApolloProvider>
  );
}
