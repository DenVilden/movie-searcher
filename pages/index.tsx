import { Grid } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Upcoming from './upcoming/[page]';
import NowPlaying from './now_playing/[page]';
import { useGetMoviesQuery, GetMoviesDocument } from '../__generated__';
import { initializeApollo } from '../apollo';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const { data, error } = useGetMoviesQuery();

  if (error) return <ErrorMessage error={error.message} />;

  return data ? (
    <Grid container>
      <Grid item lg={6}>
        <NowPlaying initialData={{ nowPlaying: data.nowPlaying }} />
      </Grid>
      <Grid item lg={6}>
        <Upcoming initialData={{ upcoming: data.upcoming }} />
      </Grid>
    </Grid>
  ) : null;
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetMoviesDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};
