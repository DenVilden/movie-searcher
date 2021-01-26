import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import FavoritesIcon from "../components/FavoritesIcon";
import FavoritesDropdown from "../components/FavoritesDropdown";
import { favoritesVar } from "../lib/apollo";

const Favorites = () => {
  const favorites = useReactiveVar(favoritesVar);

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
          toggleFavoritesOpen={() => toggleFavorites(!favoritesOpen)}
        />
      )}
    </>
  );
};

export default Favorites;
