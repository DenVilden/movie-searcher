import React from 'react';
import Spinner from '../components/Spinner';
import MovieInfoComponent from '../components/MovieInfo/MovieInfo';
import ErrorMessage from '../components/ErrorMessage';
import {
  useAddOrRemoveFromFavoritesMutation,
  GetMovieInfoDocument,
} from '../__generated__';
import { MovieInfoResults } from '../types/types';

type Props = {
  id: string;
  movie: MovieInfoResults;
  isInFavorites: boolean;
};

const MoviePage = ({ id, movie, isInFavorites }: Props) => {
  const [
    addOrRemoveFromFavorites,
    { loading, error },
  ] = useAddOrRemoveFromFavoritesMutation({
    variables: { id },
    refetchQueries: [{ query: GetMovieInfoDocument, variables: { id } }],
  });

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <MovieInfoComponent
      isInFavorites={isInFavorites}
      movie={movie}
      toggleSave={addOrRemoveFromFavorites}
    />
  );
};

export default MoviePage;
