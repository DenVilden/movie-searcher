import React from 'react';
import { Divider } from '@material-ui/core';
import { StyledPopover, StyledTypography } from './FavoritesDropdown.styles';
import FavoritesCard from '../../containers/FavoritesCardContainer';

type Props = {
  open: boolean;
  toggleFavoritesOpen: () => void;
  clearInputValue: () => void;
  favorites: string[];
};

const FavoritesDropdown = ({
  favorites,
  open,
  toggleFavoritesOpen,
  clearInputValue,
}: Props) => (
  <StyledPopover
    anchorReference="none"
    onClose={toggleFavoritesOpen}
    open={open}
  >
    <StyledTypography variant="overline">Favorites</StyledTypography>
    <Divider />
    {favorites.map(id => (
      <FavoritesCard
        key={id}
        clearInputValue={clearInputValue}
        id={id}
        toggleFavoritesOpen={toggleFavoritesOpen}
      />
    ))}
  </StyledPopover>
);

export default FavoritesDropdown;
