import React, { useEffect } from 'react';
import { Slide, LinearProgress } from '@material-ui/core';
import ErrorMessage from '../containers/ErrorMessage';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import {
  useGetMovieInfoQuery,
  useSetInputValueMutation,
  useAddOrRemoveFromFavoritesMutation,
  GetMovieInfoDocument,
} from '../__generated__';

type Props = {
  id: string;
};

const MoviePage = ({ id }: Props) => {
  const { loading, error, data } = useGetMovieInfoQuery({
    variables: { id },
  });

  const [setInputValue] = useSetInputValueMutation();

  const [addOrRemoveFromFavorites] = useAddOrRemoveFromFavoritesMutation();

  useEffect(() => {
    setInputValue({ variables: { value: '' } });
  }, [setInputValue, id]);

  if (loading) return <LinearProgress color="secondary" />;

  if (error || !data?.movieInfo)
    return <ErrorMessage>{error?.message || 'No data found'}</ErrorMessage>;

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
