/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import { AppProps } from "next/app";
import { createMuiTheme, StylesProvider, CssBaseline } from "@material-ui/core";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import Header from "../containers/Header";
import { client } from "../lib/apollo";

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

export const theme = createMuiTheme();

const NextApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
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
          <ApolloProvider client={client}>
            <Header />
          </ApolloProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default NextApp;
