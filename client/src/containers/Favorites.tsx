import { useState } from "react";
import FavoritesIcon from "../components/FavoritesIcon";
import FavoritesDropdown from "../components/FavoritesDropdown";
import { useGetFavoritesQuery } from "../graphql/__generated__";

const Favorites = () => {
  const { data } = useGetFavoritesQuery();

  const [favoritesOpen, toggleFavorites] = useState(false);

  return data ? (
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
  ) : null;
};

export default Favorites;
