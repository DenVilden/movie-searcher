import React from 'react';
import PropTypes from 'prop-types';
import {
  CardActionArea,
  Divider,
  Typography,
  CardMedia,
  Popover,
} from '@material-ui/core';
import styled from 'styled-components';
import noImage from '../assets/no-image.jpg';

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

/* STYLES */
const StyledTypography = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 56px;
  margin: ${({ theme }) => theme.spacing(1)}px;
  width: 50px;
  display: none;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;

const StyledPopover = styled(Popover)`
  & .MuiPopover-paper {
    right: 16px;
    top: 45px;
  }
`;
