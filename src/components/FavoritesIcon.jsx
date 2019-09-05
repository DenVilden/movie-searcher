import React from 'react';
import PropTypes from 'prop-types';
import { Badge, IconButton } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import styled from 'styled-components';

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

FavoritesIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default FavoritesIcon;

// STYLES
const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;
