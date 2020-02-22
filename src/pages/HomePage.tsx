import React from 'react';
import { Grid } from '@material-ui/core';
import Upcoming from '../containers/Upcoming';
import TopRated from '../containers/TopRated';

const HomePage = () => (
  <Grid container>
    <Grid item lg={6}>
      <Upcoming />
    </Grid>
    <Grid item lg={6}>
      <TopRated />
    </Grid>
  </Grid>
);

export default HomePage;
