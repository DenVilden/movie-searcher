import { useEffect } from "react";
import { Slide, LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import MovieInfo from "../../components/MovieInfo";
import MoviesBox from "../../components/MoviesBox";
import ErrorMessage from "../../containers/ErrorMessage";
import { useGetMovieInfoLazyQuery } from "../../graphql/__generated__";
import withApollo, { favoritesVar } from "../../lib/apollo";

export const MoviePage = () => {
  const favorites = useReactiveVar(favoritesVar);

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

  if (error) return <ErrorMessage error={error} />;

  if (loading || !data?.movieInfo) return <LinearProgress color="secondary" />;

  const addOrRemoveFromFavorites = () => {
    return favorites.includes(id as string)
      ? favoritesVar(favorites.filter((favId) => favId !== id))
      : favoritesVar([...favorites, id as string]);
  };

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          addOrRemoveFromFavorites={addOrRemoveFromFavorites}
          movie={data.movieInfo}
          isInFavorites={favorites.includes(id as string)}
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
};

export default withApollo(MoviePage);
