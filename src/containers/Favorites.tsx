import React, { useState } from 'react';
import FavoritesIcon from '../components/FavoritesIcon/FavoritesIcon';
import FavoritesDropdown from '../components/FavoritesDropdown/FavoritesDropdown';
import { useGetFavoritesQuery } from '../__generated__';

const Favorites = () => {
  const { data } = useGetFavoritesQuery();

  const [favoritesOpen, toggleFavorites] = useState(false);

  if (!data) throw new Error('No data found');

  return (
    <>
      <FavoritesIcon
        open={favoritesOpen}
        toggle={() => toggleFavorites(!favoritesOpen)}
        total={data.favorites.length}
      />
      {favoritesOpen && (
        <FavoritesDropdown
          favorites={data.favorites}
          open={favoritesOpen}
          toggleFavoritesOpen={() => toggleFavorites(!favoritesOpen)}
        />
      )}
    </>
  );
};

export default Favorites;
