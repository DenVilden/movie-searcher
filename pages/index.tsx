import { Grid } from '@material-ui/core';
import Upcoming from './upcoming/[page]';
import TopRated from './top-rated/[page]';

export default function HomePage() {
  return (
    <Grid container>
      <Grid item lg={6}>
        <Upcoming />
      </Grid>
      <Grid item lg={6}>
        <TopRated />
      </Grid>
    </Grid>
  );
}
