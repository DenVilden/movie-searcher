import React, { useState } from 'react';
import FavoritesIcon from '../components/FavoritesIcon/FavoritesIcon';
import FavoritesDropdown from '../components/FavoritesDropdown/FavoritesDropdown';
import {
  useGetFavoritesQuery,
  useSetInputValueMutation,
} from '../__generated__';

const Favorites = () => {
  const { data } = useGetFavoritesQuery();

  const [setInputValue] = useSetInputValueMutation({
    variables: { value: '' },
  });

  const [favoritesOpen, toggleFavorites] = useState(false);

  if (!data) throw new Error('Data not found');

  return (
    <>
      <FavoritesIcon
        open={favoritesOpen}
        toggle={() => toggleFavorites(!favoritesOpen)}
        total={data.favorites.length}
      />
      {favoritesOpen && (
        <FavoritesDropdown
          clearInputValue={setInputValue}
          favorites={data.favorites}
          open={favoritesOpen}
          toggleFavoritesOpen={() => toggleFavorites(!favoritesOpen)}
        />
      )}
    </>
  );
};

export default Favorites;
