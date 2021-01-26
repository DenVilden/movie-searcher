import { Grid, LinearProgress } from "@material-ui/core";
import Upcoming from "../containers/Upcoming";
import TopRated from "../containers/TopRated";
import { useGetMoviesQuery } from "../graphql/__generated__";
import ErrorMessage from "../containers/ErrorMessage";
import withApollo from "../lib/apollo";

export const HomePage = () => {
  const { data, error } = useGetMoviesQuery();

  if (error) return <ErrorMessage error={error} />;

  if (!data) return <LinearProgress color="secondary" />;

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
