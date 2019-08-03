import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import dayjs from 'dayjs';
import numeral from 'numeral';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography
} from './MovieInfo.styles';
import noImage from '../../assets/no-image.jpg';
import useToggleSaveState from '../../hooks/useToggleSaveState';

const MovieInfo = () => {
  const [movie, isExist, toggleSave] = useToggleSaveState();

  return (
    <StyledCard elevation={10}>
      <StyledCardMedia
        image={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : noImage
        }
        src="img"
      />
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h5">
          {movie.title}{' '}
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
          <b>Budget:</b>{' '}
          {movie.budget ? numeral(movie.budget).format('$0,00') : 'no data'}
        </Typography>
        <Divider />
        <Typography>
          <b>Revenue:</b>{' '}
          {movie.revenue ? numeral(movie.revenue).format('$0,00') : 'no data'}
        </Typography>
        <Divider />
        <Typography>
          <b>Rating:</b> {movie.vote_average || 'no data'}
        </Typography>
        <Divider />
        <Typography>
          <b>Release Date:</b>{' '}
          {dayjs(movie.release_date).format('DD MMMM YYYY')}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MovieInfo;
