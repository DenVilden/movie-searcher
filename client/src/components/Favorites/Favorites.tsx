import { useState } from "react";
import { Divider, Badge } from "@material-ui/core";
import { useReactiveVar } from "@apollo/client";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@material-ui/icons";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import { favoritesVar } from "../../apollo";
import {
  StyledIconButton,
  StyledTypography,
  StyledPopover,
} from "./Favorites.styles";

const Favorites = () => {
  const favorites = useReactiveVar(favoritesVar);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <StyledIconButton
        color="inherit"
        data-testid="icon-button"
        disabled={!favorites.length}
        onClick={handleToggle}
      >
        <Badge badgeContent={favorites.length} color="secondary">
          {toggle ? <FavoriteBorderIcon /> : <FavoriteIcon />}
        </Badge>
      </StyledIconButton>
      <StyledPopover
        anchorReference="none"
        data-testid="dropdown"
        onClose={handleToggle}
        open={toggle}
      >
        <StyledTypography variant="overline">Favorites</StyledTypography>
        <Divider />
        {favorites.map((favorite) => (
          <FavoritesCard
            handleToggle={handleToggle}
            key={favorite.id}
            favorite={favorite}
          />
        ))}
      </StyledPopover>
    </>
  );
};

export default Favorites;
