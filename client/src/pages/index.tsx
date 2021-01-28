import { Grid, LinearProgress } from "@material-ui/core";
import { Upcoming, TopRated } from "../sections";
import { useGetMoviesQuery } from "../graphql";
import { ErrorMessage } from "../components";
import withApollo from "../lib/apollo";
import withHeader from "../lib/withHeader";

export const HomePage = withHeader(() => {
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
});

export default withApollo(HomePage);
