import { Grid } from '@material-ui/core';
import { GetStaticProps } from 'next';
import {
  useGetMoviesQuery,
  GetMoviesDocument,
  initializeApollo,
} from '../apollo';
import { ErrorMessage, Upcoming, TopRated } from '../components';

export default function HomePage() {
  const { data, error } = useGetMoviesQuery();

  if (error) return <ErrorMessage error={error.message} />;

  return data ? (
    <Grid container>
      <Grid item lg={6}>
        <Upcoming initialData={{ upcoming: data.upcoming }} />
      </Grid>
      <Grid item lg={6}>
        <TopRated initialData={{ topRated: data.topRated }} />
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
