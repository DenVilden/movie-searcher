import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import MovieCard from '../MovieCard/MovieCard';
import { Root, Wrapper, StyledButton } from './MoviesBox.styles';

const defaultProps = {
  title: '',
  elevation: 10,
  padding: 1,
};

type Props = {
  movies: {
    id: number;
    title: string;
    vote_average?: number;
    poster_path?: string | null | undefined;
    release_date?: string;
  }[];
  clearInputValue?: () => void;
  showAll?: () => void;
  hasMore?: boolean | null | undefined;
} & typeof defaultProps;

const MoviesBox = ({
  movies,
  title,
  elevation,
  padding,
  clearInputValue,
  showAll,
  hasMore,
}: Props) => (
  <Root elevation={elevation} padding={padding}>
    {title && (
      <Typography align="center" gutterBottom variant="h4">
        {title}
      </Typography>
    )}
    <Grow in>
      <Grid container>
        {movies.map(movie => (
          <Wrapper
            key={movie.id}
            container
            item
            justify="space-around"
            md={3}
            sm={6}
          >
            <MovieCard clearInputValue={clearInputValue} movie={movie} />
          </Wrapper>
        ))}
        {hasMore && (
          <StyledButton onClick={showAll} variant="contained">
            show all
          </StyledButton>
        )}
      </Grid>
    </Grow>
  </Root>
);

MoviesBox.defaultProps = defaultProps;

export default MoviesBox;
