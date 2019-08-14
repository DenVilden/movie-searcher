import React from 'react';
import PropTypes from 'prop-types';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

const MoviesSimilar = ({ movies }) => {
  return movies.length ? (
    <MoviesContainer
      elevation={10}
      movies={movies}
      padding={1}
      title="Similar Movies"
    />
  ) : null;
};

MoviesSimilar.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string
    })
  ).isRequired
};

export default MoviesSimilar;
