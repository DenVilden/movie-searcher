import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Grow, Typography } from '@material-ui/core';
import { Root, List, Wrapper } from './MoviesBox.styles';
import MovieCard from '../MovieCard/MovieCard';

const propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string,
  elevation: PropTypes.number,
  padding: PropTypes.number,
  clearInputValue: PropTypes.func,
};

const defaultProps = {
  title: '',
  elevation: 10,
  padding: 1,
  clearInputValue: null,
};

const MoviesBox = ({ movies, title, elevation, padding, clearInputValue }) => {
  if (!movies.length) return null;

  return (
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
};

MoviesBox.propTypes = propTypes;
MoviesBox.defaultProps = defaultProps;

export default MoviesBox;
