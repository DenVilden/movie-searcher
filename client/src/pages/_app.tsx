/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { createMuiTheme, StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

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
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <title>Movie Searcher</title>
      </Head>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default NextApp;
