import { useEffect } from "react";
import { Slide, LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import MovieInfo from "../../components/MovieInfo";
import MoviesBox from "../../components/MoviesBox";
import ErrorMessage from "../../containers/ErrorMessage";
import { useGetMovieInfoLazyQuery } from "../../graphql";
import withApollo, { favoritesVar } from "../../lib/apollo";
import Header from "../../containers/Header";

export const MoviePage = () => {
  const favorites = useReactiveVar(favoritesVar);

  const { id } = useRouter().query as { id: string };

  const [fetchMovies, { loading, error, data }] = useGetMovieInfoLazyQuery();

  useEffect(() => {
    if (id) {
      fetchMovies({
        variables: { id },
      });
    }
  }, [id, fetchMovies]);

  if (error) return <ErrorMessage error={error} />;

  if (loading || !data?.movieInfo) return <LinearProgress color="secondary" />;

  const addOrRemoveFromFavorites = () => {
    let newFavorites: string[] = [];

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id);
      favoritesVar(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      newFavorites = favoritesVar([...favorites, id]);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
    return newFavorites;
  };

  return (
    <>
      <Header />
      <Slide direction="up" in>
        <div>
          <MovieInfo
            addOrRemoveFromFavorites={addOrRemoveFromFavorites}
            movie={data.movieInfo}
            isInFavorites={favorites.includes(id)}
          />
          {!!data.movieInfo.similar.results.length && (
            <MoviesBox
              movies={data.movieInfo.similar.results}
              title="Similar Movies"
            />
          )}
        </div>
      </Slide>
    </>
  );
};

export default withApollo(MoviePage);
