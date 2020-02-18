import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import FavoritesIcon from '../components/FavoritesIcon/FavoritesIcon';
import FavoritesDropdown from '../components/FavoritesDropdown/FavoritesDropdown';
import { GET_FAVORITES } from '../graphql/queries';
import { SET_INPUT_VALUE } from '../graphql/mutations';
import { GetFavorites } from '../graphql/__generated__/GetFavorites';
import {
  SetInputValue,
  SetInputValueVariables,
} from '../graphql/__generated__/SetInputValue';

const Favorites = () => {
  const { data } = useQuery<GetFavorites>(GET_FAVORITES);

  const [setInputValue] = useMutation<SetInputValue, SetInputValueVariables>(
    SET_INPUT_VALUE,
    { variables: { value: '' } }
  );

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
