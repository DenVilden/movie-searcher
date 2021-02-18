import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import { LinearProgress } from '@material-ui/core';
import { useApollo } from '../apollo';
import { Layout } from '../components';

export default function NextApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

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
    <ApolloProvider client={apolloClient}>
      <Layout>
        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </ApolloProvider>
  );
}
