import React from 'react';
import { Badge } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import { StyledIconButton } from './FavoritesIcon.styles';

type Props = {
  open: boolean;
  total: number;
  toggle: () => void;
};

const FavoritesIcon = ({ total, open, toggle }: Props) => (
  <StyledIconButton color="inherit" disabled={!total} onClick={toggle}>
    <Badge badgeContent={total} color="secondary">
      {open ? <FavoriteBorderIcon /> : <FavoriteIcon />}
    </Badge>
  </StyledIconButton>
);

export default FavoritesIcon;
