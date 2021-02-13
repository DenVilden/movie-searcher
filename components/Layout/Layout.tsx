import { StylesProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
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

const Layout = ({ children }: Props) => (
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
        {children}
      </ThemeProvider>
    </StylesProvider>
  </>
);

export default Layout;
