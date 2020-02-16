import React, { Suspense, lazy, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import FavoritesIcon from '../components/FavoritesIcon/FavoritesIcon';
import { GET_FAVORITES_DATA } from '../graphql/queries';
import { SET_INPUT_VALUE } from '../graphql/mutations';

const FavoritesDropdown = lazy(() =>
  import('../components/FavoritesDropdown/FavoritesDropdown')
);

const Favorites = () => {
  const {
    data: { favorites },
  } = useQuery(GET_FAVORITES_DATA);
  const [setInputValue] = useMutation(SET_INPUT_VALUE);
  const [favoritesOpen, toggleFavorites] = useState(false);

  return (
    <Suspense fallback={<></>}>
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
    </Suspense>
  );
};

export default Favorites;
