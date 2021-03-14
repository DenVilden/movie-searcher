import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { css } from '@emotion/react'
import { CssBaseline, LinearProgress, useMediaQuery } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { prefersDarkModeVar, useApollo } from '~/apollo/client'
import Header from '~/components/Header'

export default function NextApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  const [loading, setLoading] = useState(false)
  const prefersDarkMode = useReactiveVar(prefersDarkModeVar)
  const systemColorScheme = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode) {
      try {
        prefersDarkModeVar(JSON.parse(darkMode))
      } catch (error) {
        prefersDarkModeVar(systemColorScheme)
      }
    } else {
      prefersDarkModeVar(systemColorScheme)
    }

    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [systemColorScheme])

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Movie Searcher</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {loading ? (
          <LinearProgress
            color="secondary"
            css={css`
              height: 3px;
              z-index: 9999;
            `}
          />
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </ApolloProvider>
  )
}
