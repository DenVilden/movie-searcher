import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Button } from '@material-ui/core';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
} from './MovieInfo.styles';
import noImage from '../../assets/no-image.jpg';

/* eslint-disable camelcase */
const MovieInfo = ({ movie, isExist, toggleSave }) => (
  <StyledCard elevation={10}>
    <StyledCardMedia image={movie.backdrop_path || noImage} src="img" />
    <StyledCardContent>
      <StyledTypography gutterBottom variant="h5">
        {movie.title}
        <Button
          color={isExist ? 'secondary' : 'primary'}
          onClick={toggleSave}
          variant="contained"
        >
          {isExist ? 'Remove from favorites' : 'Add to favorites'}
        </Button>
      </StyledTypography>
      <Typography>{movie.overview}</Typography>
      <Divider />
      <Typography>
        <b>Budget:</b> {movie.budget}
      </Typography>
      <Divider />
      <Typography>
        <b>Revenue:</b> {movie.revenue}
      </Typography>
      <Divider />
      <Typography>
        <b>Rating:</b> {movie.vote_average}
      </Typography>
      <Divider />
      <Typography>
        <b>Release Date:</b> {movie.release_date}
      </Typography>
    </StyledCardContent>
  </StyledCard>
);

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    budget: PropTypes.string,
    revenue: PropTypes.string,
    overview: PropTypes.string,
    backdrop_path: PropTypes.string,
  }).isRequired,
  isExist: PropTypes.bool.isRequired,
  toggleSave: PropTypes.func.isRequired,
};

export default MovieInfo;
