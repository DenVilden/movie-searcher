import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import Upcoming from '../containers/Upcoming';
import TopRated from '../containers/TopRated';
import { useGetMoviesQuery } from '../__generated__';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const { data, error, loading } = useGetMoviesQuery();

  if (loading) return <LinearProgress color="secondary" />;

  if (error || !data)
    return <ErrorMessage>{error?.message || 'Data not found'}</ErrorMessage>;

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

export default HomePage;
