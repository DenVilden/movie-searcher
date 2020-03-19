import React, { useEffect } from 'react';
import { Slide, LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import ErrorMessage from '../containers/ErrorMessage';
import {
  GetMovieInfoDocument,
  useGetMovieInfoLazyQuery,
} from '../generated/queries.generated';
import {
  useSetInputValueMutation,
  useAddOrRemoveFromFavoritesMutation,
} from '../generated/mutations.generated';
import { withApollo } from '../lib/withApollo';
import Header from '../containers/Header';

export const MoviePage = () => {
  const {
    query: { id },
  } = useRouter();

  const [fetchMovies, { loading, error, data }] = useGetMovieInfoLazyQuery();

  const [setInputValue] = useSetInputValueMutation();

  useEffect(() => {
    if (id) {
      fetchMovies({
        variables: { id: id as string },
      });
    }
    setInputValue({ variables: { value: '' } });
  }, [id, fetchMovies, setInputValue]);

  const [
    addOrRemoveFromFavorites,
    favoritesMutationOptions,
  ] = useAddOrRemoveFromFavoritesMutation();

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Header />
      {loading || !data?.movieInfo ? (
        <LinearProgress color="secondary" />
      ) : (
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
      )}
    </>
  );
};

export default withApollo()(MoviePage);
