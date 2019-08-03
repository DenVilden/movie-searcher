import React from 'react';
import { CardActionArea, Divider, IconButton, Badge } from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Root,
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
  StyledPopover
} from './MoviesFavorites.styles';
import noImage from '../../assets/no-image.jpg';
import {
  selectFavoritesData,
  selectFavoritesOpen
} from '../../selectors/favorites.selector';
import useAnchorState from '../../hooks/useAnchorState';

const MoviesFavorites = () => {
  const favorites = useSelector(selectFavoritesData);
  const open = useSelector(selectFavoritesOpen);
  const [anchorEl, handleClick, handleClose] = useAnchorState();

  return (
    <Root>
      <IconButton
        color="inherit"
        disabled={!favorites.length}
        onClick={handleClick}
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
          horizontal: 'center'
        }}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <StyledTypography variant="overline">Favorites</StyledTypography>
        <Divider />
        {/* eslint-disable camelcase */}
        {favorites.map(({ id, poster_path, title }) => (
          <CardActionArea key={id} onClick={handleClose}>
            <Link to={`/movie/${id}`}>
              <CardWrapper>
                <StyledCardMedia
                  image={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w200${poster_path}`
                      : noImage
                  }
                  src="img"
                  title={title}
                />
                <StyledTypography>{title}</StyledTypography>
              </CardWrapper>
            </Link>
          </CardActionArea>
        ))}
      </StyledPopover>
    </Root>
  );
};

export default MoviesFavorites;
