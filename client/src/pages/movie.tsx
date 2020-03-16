import React, { useEffect } from 'react';
import { Slide, LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import ErrorMessage from '../containers/ErrorMessage';
import {
  GetMovieInfoDocument,
  useGetMovieInfoQuery,
} from '../generated/queries.generated';
import {
  useSetInputValueMutation,
  useAddOrRemoveFromFavoritesMutation,
} from '../generated/mutations.generated';

const MoviePage = () => {
  const {
    query: { id },
  } = useRouter();

  const { loading, error, data } = useGetMovieInfoQuery({
    variables: { id: id as string },
  });

  const [setInputValue] = useSetInputValueMutation();

  useEffect(() => {
    setInputValue({ variables: { value: '' } });
  }, [id, setInputValue]);

  const [
    addOrRemoveFromFavorites,
    favoritesMutationOptions,
  ] = useAddOrRemoveFromFavoritesMutation();

  if (loading || !data?.movieInfo) return <LinearProgress color="secondary" />;

  if (error) return <ErrorMessage error={error} />;

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
};

export default MoviePage;
