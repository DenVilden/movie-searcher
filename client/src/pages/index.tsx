import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import Upcoming from '../containers/Upcoming';
import TopRated from '../containers/TopRated';
import { useGetMoviesQuery } from '../generated/queries.generated';
import ErrorMessage from '../containers/ErrorMessage';
import { withApollo } from '../lib/withApollo';
import Layout from '../containers/Layout';

export const HomePage = () => {
  const { data, error } = useGetMoviesQuery();

  if (error) return <ErrorMessage error={error} />;

  return (
    <Layout>
      {data ? (
        <Grid container>
          <Grid item lg={6}>
            <Upcoming initialData={data.upcoming} />
          </Grid>
          <Grid item lg={6}>
            <TopRated initialData={data.topRated} />
          </Grid>
        </Grid>
      ) : (
        <LinearProgress color="secondary" />
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(HomePage);
