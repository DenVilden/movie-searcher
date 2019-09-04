import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Divider,
  Button,
  CardContent,
  Card,
  CardMedia,
} from '@material-ui/core';
import styled from 'styled-components';
import noImage from '../assets/no-image.jpg';

/* eslint-disable camelcase */
const MovieInfo = ({ movie, isExist, toggleSave }) => {
  if (!movie) return null;

  return (
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
};

MovieInfo.defaultProps = {
  movie: null,
};

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
  }),
  isExist: PropTypes.bool.isRequired,
  toggleSave: PropTypes.func.isRequired,
};

// STYLES
const StyledCard = styled(Card)`
  background-color: inherit;
  display: block;
  margin: ${({ theme }) => theme.spacing(2)}px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: flex;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 450px;
  margin: ${({ theme }) => theme.spacing(2)}px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 40%;
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 60%;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;

export default MovieInfo;
