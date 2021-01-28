import { Slide, LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { MovieInfo } from "../../sections";
import { MoviesBox, ErrorMessage } from "../../components";
import { useGetMovieInfoQuery } from "../../graphql";
import withApollo from "../../lib/apollo";
import withHeader from "../../lib/withHeader";

export const MoviePage = withHeader(() => {
  const { id } = useRouter().query as { id: string };

  const { loading, error, data } = useGetMovieInfoQuery({ variables: { id } });

  if (error) return <ErrorMessage error={error} />;

  if (loading || !data?.movieInfo) return <LinearProgress color="secondary" />;

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo movie={data.movieInfo} />
        {!!data.movieInfo.similar.results.length && (
          <MoviesBox
            movies={data.movieInfo.similar.results}
            title="Similar Movies"
          />
        )}
      </div>
    </Slide>
  );
});

export default withApollo(MoviePage);
