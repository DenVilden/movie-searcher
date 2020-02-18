/* eslint-disable camelcase */
import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
} from './MovieInfo.styles';
import noImage from '../../assets/no-image.jpg';
import { GetMovieInfo_movieInfo } from '../../graphql/__generated__/GetMovieInfo';

type Props = {
  movie: GetMovieInfo_movieInfo;
  isExist: boolean;
  toggleSave: () => void;
};

/* eslint-disable camelcase */
const MovieInfo = ({ movie, isExist, toggleSave }: Props) => (
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

export default MovieInfo;
