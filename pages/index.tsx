import { Grid } from '@material-ui/core';
import { GetStaticProps } from 'next';
import {
  useGetMoviesQuery,
  GetMoviesDocument,
  initializeApollo,
} from '../apollo';
import { ErrorMessage, Upcoming, TopRated } from '../components';

const HomePage = () => {
  const { data, error } = useGetMoviesQuery();

  if (error || !data)
    return <ErrorMessage error={error?.message || 'No data'} />;

  return (
    <Grid container>
      <Grid item lg={6}>
        <Upcoming initialData={{ upcoming: data.upcoming }} />
      </Grid>
      <Grid item lg={6}>
        <TopRated initialData={{ topRated: data.topRated }} />
      </Grid>
    </Grid>
  );
};

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

export default HomePage;
