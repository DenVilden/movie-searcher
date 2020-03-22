import React from 'react';
import { Divider } from '@material-ui/core';
import { StyledPopover, StyledTypography } from './FavoritesDropdown.styles';
import FavoritesItem from '../../containers/FavoritesItem';

type Props = {
  open: boolean;
  toggleFavoritesOpen: () => void;
  favorites: string[];
};

const FavoritesDropdown = ({ favorites, open, toggleFavoritesOpen }: Props) => (
  <StyledPopover
    anchorReference="none"
    data-testid="dropdown"
    onClose={toggleFavoritesOpen}
    open={open}
  >
    <StyledTypography variant="overline">Favorites</StyledTypography>
    <Divider />
    {favorites.map((id) => (
      <FavoritesItem
        key={id}
        id={id}
        toggleFavoritesOpen={toggleFavoritesOpen}
      />
    ))}
  </StyledPopover>
);

export default FavoritesDropdown;
