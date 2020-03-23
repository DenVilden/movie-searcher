import React from 'react';
import {
  Typography,
  Divider,
  Button,
  CardContent,
  Card,
  CardMedia,
} from '@material-ui/core';
import Head from 'next/head';
import styled from 'styled-components';
import { MovieInfo as MovieInfoType } from '../generated/types';

const StyledCard = styled(Card)`
  background-color: inherit;
  display: block;
  margin: ${(props) => props.theme.spacing(2)}px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 450px;
  margin: ${(props) => props.theme.spacing(2)}px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 40%;
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  movie: MovieInfoType;
  loading: boolean;
  addOrRemoveFromFavorites: () => void;
};

const MovieInfo = ({ movie, addOrRemoveFromFavorites, loading }: Props) => (
  <StyledCard elevation={10}>
    <Head>
      <title>{movie.title}</title>
    </Head>
    <StyledCardMedia image={movie.backdrop_path || 'no-image.jpg'} src="img" />
    <StyledCardContent>
      <StyledTypography gutterBottom variant="h5">
        {movie.title}
        <Button
          color={movie.isInFavorites ? 'secondary' : 'primary'}
          data-testid="favorites-button"
          disabled={loading}
          onClick={addOrRemoveFromFavorites}
          variant="contained"
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {loading
            ? 'Updating'
            : movie.isInFavorites
            ? 'Remove from favorites'
            : 'Add to favorites'}
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
