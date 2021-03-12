import { Grid } from '@material-ui/core';
import { GetStaticProps } from 'next';

import ErrorMessage from 'components/ErrorMessage';
import { initializeApollo, addApolloState } from 'apollo/client';
import {
  useGetMoviesQuery,
  GetMoviesDocument,
  GetMoviesQuery,
} from 'apollo/__generated__';
import Upcoming from './upcoming/[page]';
import NowPlaying from './now_playing/[page]';

export default function HomePage() {
  const { data, error } = useGetMoviesQuery();

  if (error || !data)
    return <ErrorMessage error={error?.message || 'No data'} />;

  return (
    <Grid container>
      <Grid item lg={6}>
        <NowPlaying initialData={{ nowPlaying: data.nowPlaying }} />
      </Grid>
      <Grid item lg={6}>
        <Upcoming initialData={{ upcoming: data.upcoming }} />
      </Grid>
    </Grid>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<GetMoviesQuery>({
    query: GetMoviesDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10,
  });
};
