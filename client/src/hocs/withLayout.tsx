/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import Header from "../containers/Header";

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

const withLayout = (Component: React.ComponentType) => ({ ...pageProps }) => (
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
    <Header />
    <CssBaseline />
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default withLayout;
