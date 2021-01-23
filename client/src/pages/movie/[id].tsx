import { useEffect } from "react";
import { Slide, LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import MovieInfo from "../../components/MovieInfo";
import MoviesBox from "../../components/MoviesBox";
import ErrorMessage from "../../containers/ErrorMessage";
import {
  GetMovieInfoDocument,
  useGetMovieInfoLazyQuery,
  useAddOrRemoveFromFavoritesMutation,
} from "../../graphql/__generated__";
import { withApollo } from "../../hocs/withApollo";
import withLayout from "../../hocs/withLayout";

export const MoviePage = withLayout(() => {
  const {
    query: { id },
  } = useRouter();

  const [fetchMovies, { loading, error, data }] = useGetMovieInfoLazyQuery();

  useEffect(() => {
    if (id) {
      fetchMovies({
        variables: { id: id as string },
      });
    }
  }, [id, fetchMovies]);

  const [
    addOrRemoveFromFavorites,
    favoritesMutationOptions,
  ] = useAddOrRemoveFromFavoritesMutation();

  if (error) return <ErrorMessage error={error} />;

  if (loading || !data?.movieInfo) return <LinearProgress color="secondary" />;

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          addOrRemoveFromFavorites={() =>
            addOrRemoveFromFavorites({
              variables: { id: id as string },
              refetchQueries: [
                {
                  query: GetMovieInfoDocument,
                  variables: { id: id as string },
                },
              ],
            })
          }
          loading={favoritesMutationOptions.loading}
          movie={data.movieInfo}
        />
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

export default withApollo()(MoviePage);
