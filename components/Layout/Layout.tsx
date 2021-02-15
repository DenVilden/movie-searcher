import { StylesProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { Header } from '..';
import { theme } from '../../lib/theme';

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/Roboto-Regular.woff2');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/Roboto-Medium.woff2');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/Roboto-Bold.woff2');
  }
`;

interface Props {
  children: React.ReactElement;
}

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <link
        rel="preload"
        href="/Roboto-Regular.woff2"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/Roboto-Medium.woff2"
        as="font"
        crossOrigin=""
      />
      <link rel="preload" href="/Roboto-Bold.woff2" as="font" crossOrigin="" />
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

export default Layout;
