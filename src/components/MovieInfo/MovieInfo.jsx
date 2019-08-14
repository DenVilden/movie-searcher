import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Button } from '@material-ui/core';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography
} from './MovieInfo.styles';
import noImage from '../../assets/no-image.jpg';

/* eslint-disable camelcase */
const MovieInfo = ({
  movie: {
    backdrop_path,
    title,
    overview,
    budget,
    revenue,
    vote_average,
    release_date
  },
  isExist,
  toggleSave
}) => (
  <StyledCard elevation={10}>
    <StyledCardMedia image={backdrop_path || noImage} src="img" />
    <StyledCardContent>
      <StyledTypography gutterBottom variant="h5">
        {title}
        <Button
          color={isExist ? 'secondary' : 'primary'}
          onClick={toggleSave}
          variant="contained"
        >
          {isExist ? 'Remove from favorites' : 'Add to favorites'}
        </Button>
      </StyledTypography>
      <Typography>{overview}</Typography>
      <Divider />
      <Typography>
        <b>Budget:</b> {budget}
      </Typography>
      <Divider />
      <Typography>
        <b>Revenue:</b> {revenue}
      </Typography>
      <Divider />
      <Typography>
        <b>Rating:</b> {vote_average}
      </Typography>
      <Divider />
      <Typography>
        <b>Release Date:</b> {release_date}
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
    similarMovies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string
      })
    )
  }).isRequired,
  isExist: PropTypes.bool.isRequired,
  toggleSave: PropTypes.func.isRequired
};

export default MovieInfo;
