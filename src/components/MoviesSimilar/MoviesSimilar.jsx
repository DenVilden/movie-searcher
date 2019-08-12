import React from 'react';
import PropTypes from 'prop-types';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

const MoviesSimilar = ({ movies }) =>
  movies.length ? (
    <MoviesContainer
      elevation={10}
      movies={movies}
      padding={1}
      title="Similar Movies"
    />
  ) : null;

MoviesSimilar.defaultProps = {
  movies: []
};

MoviesSimilar.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string
    })
  )
};

export default MoviesSimilar;
