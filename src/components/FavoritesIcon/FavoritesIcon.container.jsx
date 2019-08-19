import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import FavoritesIcon from './FavoritesIcon';
import { GET_FAVORITES, GET_FAVORITES_STATE } from '../../graphql/queries';
import { TOGGLE_FAVORITES } from '../../graphql/mutations';

const FavoritesIconContainer = () => {
  const {
    data: { favorites },
  } = useQuery(GET_FAVORITES);
  const {
    data: { favoritesOpen },
  } = useQuery(GET_FAVORITES_STATE);

  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);

  return (
    <FavoritesIcon
      open={favoritesOpen}
      total={favorites.length}
      toggle={toggleFavoritesOpen}
    />
  );
};

export default FavoritesIconContainer;
