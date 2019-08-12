import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Grow, Typography } from '@material-ui/core';
import { Root, List, Wrapper } from './MoviesContainer.styles';
import MovieCard from '../MovieCard/MovieCard.container';

const MoviesContainer = ({ movies, title, elevation, padding, text }) => (
  <Root elevation={elevation} padding={padding}>
    {title && (
      <Typography align="center" gutterBottom variant="h4">
        {title}
      </Typography>
    )}
    <List container>
      {movies.map(movie => (
        <Grow key={movie.id} in>
          <Grid item lg={2} sm={4} xs={6}>
            <Wrapper container justify="center">
              <Grid item>
                <MovieCard {...movie} text={text} />
              </Grid>
            </Wrapper>
          </Grid>
        </Grow>
      ))}
    </List>
  </Root>
);

MoviesContainer.defaultProps = {
  title: '',
  elevation: 1,
  padding: 0,
  text: ''
};

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string,
  elevation: PropTypes.number,
  padding: PropTypes.number,
  text: PropTypes.string
};

export default MoviesContainer;
