import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import FavoritesIcon from '../components/FavoritesIcon/FavoritesIcon';
import FavoritesDropdown from '../components/FavoritesDropdown/FavoritesDropdown';
import { GET_FAVORITES_DATA } from '../graphql/queries';
import { SET_INPUT_VALUE } from '../graphql/mutations';
import GetMovieInfo from '../types/GetMovieInfo';

const Favorites = () => {
  const { data } = useQuery<{ favorites: GetMovieInfo[] }>(GET_FAVORITES_DATA);
  const [setInputValue] = useMutation<
    { setInputValue: string },
    { value: string }
  >(SET_INPUT_VALUE, { variables: { value: '' } });
  const [favoritesOpen, toggleFavorites] = useState(false);

  if (!data) throw new Error('Not found');

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
