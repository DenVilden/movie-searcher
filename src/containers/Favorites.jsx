import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import FavoritesIcon from '../components/FavoritesIcon/FavoritesIcon';
import FavoritesDropdown from '../components/FavoritesDropdown/FavoritesDropdown';
import { GET_FAVORITES_DATA } from '../graphql/queries';
import { SET_INPUT_VALUE } from '../graphql/mutations';

const Favorites = () => {
  const {
    data: { favorites },
  } = useQuery(GET_FAVORITES_DATA);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);
  const [favoritesOpen, toggleFavorites] = useState(false);

  return (
    <>
      <FavoritesIcon
        open={favoritesOpen}
        toggle={() => toggleFavorites(!favoritesOpen)}
        total={favorites.length}
      />
      {favoritesOpen && (
        <FavoritesDropdown
          favorites={favorites}
          open={favoritesOpen}
          setInputValue={setInputValue}
          toggleFavoritesOpen={() => toggleFavorites(!favoritesOpen)}
        />
      )}
    </>
  );
};

export default Favorites;
