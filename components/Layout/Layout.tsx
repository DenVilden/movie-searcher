import { StylesProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { Header } from '..';
import { theme } from '../../lib/theme';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/roboto-v20-latin-300.woff2') format('woff2'),
      url('/fonts/roboto-v20-latin-300.woff') format('woff');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/roboto-v20-latin-regular.woff2') format('woff2'),
      url('/fonts/roboto-v20-latin-regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/roboto-v20-latin-500.woff2') format('woff2'),
      url('/fonts/roboto-v20-latin-500.woff') format('woff');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/roboto-v20-latin-700.woff2') format('woff2'),
      url('/fonts/roboto-v20-latin-700.woff') format('woff');
  }

  body {
    min-width: 320px;
  }
`;

interface Props {
  children: React.ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/roboto-v20-latin-300.woff2"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/roboto-v20-latin-regular.woff2"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/roboto-v20-latin-500.woff2"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/roboto-v20-latin-700.woff2"
          as="font"
          crossOrigin="anonymous"
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
          {children}
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}
