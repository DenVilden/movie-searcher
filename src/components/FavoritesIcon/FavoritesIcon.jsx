import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import { StyledIconButton } from './FavoritesIcon.styles';

const propTypes = {
  open: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
};

const FavoritesIcon = ({ total, open, toggle }) => (
  <StyledIconButton
    color="inherit"
    disabled={!total}
    onClick={toggle}
    variant="contained"
  >
    <Badge badgeContent={total} color="secondary">
      {open ? <FavoriteBorderIcon /> : <FavoriteIcon />}
    </Badge>
  </StyledIconButton>
);

FavoritesIcon.propTypes = propTypes;

export default FavoritesIcon;
