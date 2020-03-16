import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import Upcoming from '../containers/Upcoming';
import TopRated from '../containers/TopRated';
import { useGetMoviesQuery } from '../generated/queries.generated';
import ErrorMessage from '../containers/ErrorMessage';
import withApollo from '../lib/withApollo';

export const HomePage = () => {
  const { data, error, loading } = useGetMoviesQuery();

  if (loading || !data) return <LinearProgress color="secondary" />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <Grid container>
      <Grid item lg={6}>
        <Upcoming initialData={data.upcoming} />
      </Grid>
      <Grid item lg={6}>
        <TopRated initialData={data.topRated} />
      </Grid>
    </Grid>
  );
};

export default withApollo(HomePage);
