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

/* eslint-disable camelcase */
const MovieInfo = () => {
  const [movie, isExist, toggleSave] = useToggleSaveState();

  const {
    backdrop_path,
    title,
    overview,
    budget,
    revenue,
    vote_average,
    release_date
  } = movie;

  return (
    <StyledCard elevation={10}>
      <StyledCardMedia
        image={
          backdrop_path
            ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
            : noImage
        }
        src="img"
      />
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
          <b>Budget:</b> {budget ? numeral(budget).format('$0,00') : 'no data'}
        </Typography>
        <Divider />
        <Typography>
          <b>Revenue:</b>{' '}
          {revenue ? numeral(revenue).format('$0,00') : 'no data'}
        </Typography>
        <Divider />
        <Typography>
          <b>Rating:</b> {vote_average || 'no data'}
        </Typography>
        <Divider />
        <Typography>
          <b>Release Date:</b> {dayjs(release_date).format('DD MMMM YYYY')}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MovieInfo;
