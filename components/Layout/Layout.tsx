import { useEffect, useState } from 'react';
import { StylesProvider, CssBaseline, LinearProgress } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import Router from 'next/router';
import { Header } from '..';
import { theme } from '../../lib/theme';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

interface Props {
  children: React.ReactElement;
}

const Layout = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

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
        <title key="title">Movie Searcher</title>
      </Head>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />
          <Header />
          {loading ? <LinearProgress color="secondary" /> : children}
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default Layout;
