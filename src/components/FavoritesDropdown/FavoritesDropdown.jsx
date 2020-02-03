import React from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {
  StyledPopover,
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
} from './FavoritesDropdown.styles';
import noImage from '../../assets/no-image.jpg';

const propTypes = {
  setInputValue: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
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

const FavoritesDropdown = ({
  favorites,
  setInputValue,
  history,
  open,
  toggleFavoritesOpen,
}) => (
  <StyledPopover
    anchorReference="none"
    onClose={toggleFavoritesOpen}
    open={open}
  >
    <StyledTypography variant="overline">Favorites</StyledTypography>
    <Divider />
    {/* eslint-disable camelcase */}
    {favorites.map(({ id, poster_path, title }) => (
      <CardActionArea
        key={id}
        onClick={() => {
          history.push(`/movie/${id}`);
          setInputValue('');
          toggleFavoritesOpen();
        }}
      >
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

FavoritesDropdown.propTypes = propTypes;

export default withRouter(FavoritesDropdown);
