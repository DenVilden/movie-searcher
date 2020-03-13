import React, { useEffect } from 'react';
import { Slide, LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import MoviesBox from '../../components/MoviesBox/MoviesBox';
import ErrorMessage from '../../containers/ErrorMessage';
import {
  useGetMovieInfoQuery,
  useSetInputValueMutation,
  useAddOrRemoveFromFavoritesMutation,
  GetMovieInfoDocument,
} from '../../__generated__';

const MoviePage = () => {
  const router = useRouter();
  const id = router.query.id.toString();

  const { loading, error, data } = useGetMovieInfoQuery({
    variables: { id },
  });

  const [setInputValue] = useSetInputValueMutation();

  const [addOrRemoveFromFavorites] = useAddOrRemoveFromFavoritesMutation();

  useEffect(() => {
    setInputValue({ variables: { value: '' } });
  }, [setInputValue, id]);

  if (loading) return <LinearProgress color="secondary" />;

  if (error) return <ErrorMessage error={error} />;

  if (!data?.movieInfo) throw new Error('Not found');

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          addOrRemoveFromFavorites={() =>
            addOrRemoveFromFavorites({
              variables: { id },
              refetchQueries: [
                { query: GetMovieInfoDocument, variables: { id } },
              ],
            })
          }
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
