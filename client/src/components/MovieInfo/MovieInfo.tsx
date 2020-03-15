import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
} from './MovieInfo.styles';
import { MovieInfo as MovieInfoType } from '../../generated/types';

type Props = {
  movie: MovieInfoType;
  addOrRemoveFromFavorites: () => void;
};

const MovieInfo = ({ movie, addOrRemoveFromFavorites }: Props) => (
  <StyledCard elevation={10}>
    <StyledCardMedia image={movie.backdrop_path || 'no-image.jpg'} src="img" />
    <StyledCardContent>
      <StyledTypography gutterBottom variant="h5">
        {movie.title}
        <Button
          color={movie.isInFavorites ? 'secondary' : 'primary'}
          data-testid="favorites-button"
          onClick={addOrRemoveFromFavorites}
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

export default MovieInfo;
