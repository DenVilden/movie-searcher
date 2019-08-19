import React from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Divider } from '@material-ui/core';
import {
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
  StyledPopover,
} from './FavoritesDropdown.styles';
import noImage from '../../assets/no-image.jpg';

const FavoritesDropdown = ({
  favorites,
  setInputValue,
  history,
  open,
  toggleFavoritesOpen,
}) => {
  const goTo = id => {
    history.push(`/movie/${id}`);
    setInputValue('');
    toggleFavoritesOpen();
  };

  return (
    <StyledPopover
      anchorReference="none"
      onClose={toggleFavoritesOpen}
      open={open}
    >
      <StyledTypography variant="overline">Favorites</StyledTypography>
      <Divider />
      {/* eslint-disable camelcase */}
      {favorites.map(({ id, poster_path, title }) => (
        <CardActionArea key={id} onClick={() => goTo(id)}>
          <CardWrapper>
            <StyledCardMedia
              image={poster_path || noImage}
              src="img"
              title={title}
            />
            <StyledTypography>{title}</StyledTypography>
          </CardWrapper>
        </CardActionArea>
      ))}
    </StyledPopover>
  );
};

FavoritesDropdown.propTypes = {
  setInputValue: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  open: PropTypes.bool.isRequired,
  toggleFavoritesOpen: PropTypes.func.isRequired,
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

export default FavoritesDropdown;
