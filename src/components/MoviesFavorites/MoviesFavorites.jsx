import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Divider, IconButton, Badge } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {
  Root,
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
  StyledPopover,
} from './MoviesFavorites.styles';
import noImage from '../../assets/no-image.jpg';

const MoviesFavorites = ({
  toggleFavorites,
  open,
  favorites,
  clearInputValue,
}) => {
  const [anchorEl, setAnchor] = useState();

  const toggleAnchor = evt => {
    setAnchor(evt.currentTarget);
    toggleFavorites();
  };

  return (
    <Root>
      <IconButton
        color="inherit"
        disabled={!favorites.length}
        onClick={toggleAnchor}
        variant="contained"
      >
        <Badge badgeContent={favorites.length} color="secondary">
          {open ? <FavoriteBorderIcon /> : <FavoriteIcon />}
        </Badge>
      </IconButton>
      <StyledPopover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={toggleFavorites}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledTypography variant="overline">Favorites</StyledTypography>
        <Divider />
        {/* eslint-disable camelcase */}
        {favorites.map(({ id, poster_path, title }) => (
          <CardActionArea key={id} onClick={toggleFavorites}>
            <CardWrapper>
              <Link to={`/movie/${id}`} onClick={clearInputValue}>
                <StyledCardMedia
                  image={poster_path || noImage}
                  src="img"
                  title={title}
                />
              </Link>
              <StyledTypography>{title}</StyledTypography>
            </CardWrapper>
          </CardActionArea>
        ))}
      </StyledPopover>
    </Root>
  );
};

MoviesFavorites.propTypes = {
  toggleFavorites: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  clearInputValue: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      budget: PropTypes.string,
      revenue: PropTypes.string,
      overview: PropTypes.string,
      backdrop_path: PropTypes.string,
      similar: PropTypes.shape({
        results: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            release_date: PropTypes.string,
            poster_path: PropTypes.string,
          })
        ),
      }),
    })
  ).isRequired,
};

export default MoviesFavorites;
