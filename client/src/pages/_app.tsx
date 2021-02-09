import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { createMuiTheme, StylesProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { useReactiveVar, ApolloProvider } from '@apollo/client';
import { favoritesVar, client } from '../apollo';
import { Header } from '../components';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

export const theme = createMuiTheme();
export type theme = typeof theme;

const NextApp = ({ Component, pageProps }: AppProps) => {
  const favorites = useReactiveVar(favoritesVar);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const initialFavorites = localStorage.getItem('favorites');
    if (initialFavorites) {
      favoritesVar(JSON.parse(initialFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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
      <ApolloProvider client={client}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    </>
  );
};

export default NextApp;
