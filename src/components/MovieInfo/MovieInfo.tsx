import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
} from './MovieInfo.styles';
import noImage from '../../assets/no-image.jpg';
import { MovieInfo } from '../../types/types';

type Props = {
  movie: MovieInfo;
  toggleSave: () => void;
};

const MovieInfoComponent = ({ movie, toggleSave }: Props) => (
  <StyledCard elevation={10}>
    <StyledCardMedia image={movie.backdrop_path || noImage} src="img" />
    <StyledCardContent>
      <StyledTypography gutterBottom variant="h5">
        {movie.title}
        <Button
          color={movie.isInFavorites ? 'secondary' : 'primary'}
          onClick={toggleSave}
          variant="contained"
        >
          {movie.isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
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

export default MovieInfoComponent;
