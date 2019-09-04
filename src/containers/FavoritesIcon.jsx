import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import FavoritesIcon from '../components/FavoritesIcon';
import { GET_FAVORITES_DATA, GET_FAVORITES_STATE } from '../graphql/queries';
import { TOGGLE_FAVORITES } from '../graphql/mutations';

const FavoritesIconContainer = () => {
  const {
    data: { favorites },
  } = useQuery(GET_FAVORITES_DATA);
  const { data } = useQuery(GET_FAVORITES_STATE);
  const [toggleFavoritesOpen] = useMutation(TOGGLE_FAVORITES);

  return (
    <FavoritesIcon
      open={data.favoritesOpen}
      toggle={toggleFavoritesOpen}
      total={favorites.length}
    />
  );
};

export default FavoritesIconContainer;
