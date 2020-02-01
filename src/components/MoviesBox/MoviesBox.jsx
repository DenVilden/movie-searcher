import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Grow, Typography } from '@material-ui/core';
import { Root, List, Wrapper } from './MoviesBox.styles';
import MovieCard from '../MovieCard/MovieCard.container';

const MoviesBox = ({ movies, title, elevation, padding }) => {
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
                  <MovieCard movie={movie} />
                </Grid>
              </Wrapper>
            </Grid>
          </Grow>
        ))}
      </List>
    </Root>
  );
};

MoviesBox.defaultProps = {
  title: '',
  elevation: 1,
  padding: 0,
};

MoviesBox.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string,
  elevation: PropTypes.number,
  padding: PropTypes.number,
};

export default MoviesBox;
