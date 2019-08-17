import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import MoviesFavorites from './MoviesFavorites';
import {
  GET_FAVORITES,
  TOGGLE_FAVORITES,
  CLEAR_INPUT_VALUE,
} from '../../graphql/types';

const MoviesFavoritesContainer = () => {
  const { data } = useQuery(GET_FAVORITES);
  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return (
    <MoviesFavorites
      clearInputValue={clearInputValue}
      favorites={data.favorites}
      open={data.favoritesOpen}
      toggleFavorites={toggleFavoritesOpen}
    />
  );
};

export default MoviesFavoritesContainer;
