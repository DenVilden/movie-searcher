/* eslint-disable camelcase */
import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import { Root, List, Wrapper } from './MoviesBox.styles';
import MovieCard from '../MovieCard/MovieCard';

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
    poster_path: string | null;
    release_date?: string;
  }[];
  clearInputValue?: () => void;
} & typeof defaultProps;

const MoviesBox = ({
  movies,
  title,
  elevation,
  padding,
  clearInputValue,
}: Props) => (
  <Root elevation={elevation} padding={padding}>
    {title && (
      <Typography align="center" gutterBottom variant="h4">
        {title}
      </Typography>
    )}
    <List container>
      {movies.map(movie => (
        <Grow key={movie.id} in>
          <Grid item lg={2} md={3} sm={4} xs={6}>
            <Wrapper container justify="center">
              <Grid item>
                <MovieCard clearInputValue={clearInputValue} movie={movie} />
              </Grid>
            </Wrapper>
          </Grid>
        </Grow>
      ))}
    </List>
  </Root>
);

MoviesBox.defaultProps = defaultProps;

export default MoviesBox;
