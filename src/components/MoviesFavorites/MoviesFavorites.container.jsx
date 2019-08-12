import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import MoviesFavorites from './MoviesFavorites';
import {
  GET_FAVORITES_STATE,
  GET_FAVORITES_DATA,
  TOGGLE_FAVORITES
} from '../../graphql/types';

const MoviesFavoritesContainer = () => {
  const {
    data: { favoritesOpen }
  } = useQuery(GET_FAVORITES_STATE);
  const {
    data: { favorites }
  } = useQuery(GET_FAVORITES_DATA);
  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);

  return (
    <MoviesFavorites
      favorites={favorites}
      open={favoritesOpen}
      toggleFavorites={toggleFavoritesOpen}
    />
  );
};

export default MoviesFavoritesContainer;
