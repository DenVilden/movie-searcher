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
    poster_path?: string | null;
    release_date?: string;
  }[];
  showMore?: () => void;
  hasMore?: boolean | null;
} & typeof defaultProps;

const MoviesBox = ({
  movies,
  title,
  elevation,
  padding,
  showMore,
  hasMore,
}: Props) => (
  <Root elevation={elevation} padding={padding}>
    {!!title && (
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
            data-testid="search-result"
            item
            justify="center"
            md={3}
            xs={6}
          >
            <MovieCard movie={movie} />
          </Wrapper>
        ))}
        {hasMore && (
          <StyledButton
            data-testid="show-more"
            onClick={showMore}
            variant="contained"
          >
            show more
          </StyledButton>
        )}
      </Grid>
    </Grow>
  </Root>
);

MoviesBox.defaultProps = defaultProps;

export default MoviesBox;
