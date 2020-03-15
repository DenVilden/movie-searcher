import React, { useEffect } from 'react';
import { Slide, LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import MoviesBox from '../../components/MoviesBox/MoviesBox';
import ErrorMessage from '../../containers/ErrorMessage';
import {
  useGetMovieInfoQuery,
  GetMovieInfoDocument,
} from '../../generated/queries.generated';
import {
  useSetInputValueMutation,
  useAddOrRemoveFromFavoritesMutation,
} from '../../generated/mutations.generated';
import withApollo from '../../lib/withApollo';

const MoviePage = () => {
  const {
    query: { id },
  } = useRouter();

  const { loading, error, data } = useGetMovieInfoQuery({
    variables: { id: id as string },
  });

  const [setInputValue] = useSetInputValueMutation();

  const [
    addOrRemoveFromFavorites,
    favoritesMutationOptions,
  ] = useAddOrRemoveFromFavoritesMutation();

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

export default withApollo(MoviePage);
