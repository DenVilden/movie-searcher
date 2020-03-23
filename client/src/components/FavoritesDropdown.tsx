import React from 'react';
import { Divider, Typography, Popover } from '@material-ui/core';
import styled from 'styled-components';
import FavoritesCard from './FavoritesCard';

const StyledTypography = styled(Typography)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    right: 16px;
    top: 45px;
  }
`;

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
      <FavoritesCard
        key={id}
        id={id}
        toggleFavoritesOpen={toggleFavoritesOpen}
      />
    ))}
  </StyledPopover>
);

export default FavoritesDropdown;
