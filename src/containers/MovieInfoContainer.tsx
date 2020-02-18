import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_MOVIE_INFO } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import ErrorMessage from '../components/ErrorMessage';
import { ADD_OR_REMOVE_FROM_FAVORITES } from '../graphql/mutations';
import {
  AddOrRemoveFromFavorites,
  AddOrRemoveFromFavoritesVariables,
} from '../graphql/__generated__/AddOrRemoveFromFavorites';
import { GetMovieInfo_movieInfo } from '../graphql/__generated__/GetMovieInfo';

type Props = {
  id: string;
  movie: GetMovieInfo_movieInfo;
};

const MoviePage = ({ id, movie }: Props) => {
  const [addOrRemoveFromFavorites, { loading, error }] = useMutation<
    AddOrRemoveFromFavorites,
    AddOrRemoveFromFavoritesVariables
  >(ADD_OR_REMOVE_FROM_FAVORITES, {
    variables: { id },
    refetchQueries: [{ query: GET_MOVIE_INFO, variables: { id } }],
  });

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return <MovieInfo movie={movie} toggleSave={addOrRemoveFromFavorites} />;
};

export default MoviePage;
