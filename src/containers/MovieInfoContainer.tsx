import React from 'react';
import Spinner from '../components/Spinner';
import MovieInfoComponent from '../components/MovieInfo/MovieInfo';
import ErrorMessage from '../components/ErrorMessage';
import {
  useAddOrRemoveFromFavoritesMutation,
  GetMovieInfoDocument,
} from '../__generated__';
import { MovieInfo } from '../types/types';

type Props = {
  id: string;
  movie: MovieInfo;
};

const MoviePage = ({ id, movie }: Props) => {
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
    <MovieInfoComponent movie={movie} toggleSave={addOrRemoveFromFavorites} />
  );
};

export default MoviePage;
