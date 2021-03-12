import { useEffect, useState, useMemo } from 'preact/hooks'
import { AppProps } from 'next/app'
import { ApolloProvider, useReactiveVar } from '@apollo/client/react'
import Router from 'next/router'
import { LinearProgress, CssBaseline, useMediaQuery } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Head from 'next/head'
import { css } from '@emotion/react'

import Header from 'components/Header'
import { useApollo, prefersDarkModeVar } from 'apollo/client'

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
      prefersDarkModeVar(JSON.parse(darkMode))
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
        <title key="title">Movie Searcher</title>
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
