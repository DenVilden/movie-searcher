import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import MoviesFavorites from './MoviesFavorites';
import {
  GET_FAVORITES,
  TOGGLE_FAVORITES,
  CLEAR_INPUT_VALUE
} from '../../graphql/types';

const MoviesFavoritesContainer = props => {
  const { data } = useQuery(GET_FAVORITES);
  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return (
    <MoviesFavorites
      clearInputValue={clearInputValue}
      favorites={data.favorites}
      open={data.favoritesOpen}
      toggleFavorites={toggleFavoritesOpen}
      {...props}
    />
  );
};

export default withRouter(MoviesFavoritesContainer);
