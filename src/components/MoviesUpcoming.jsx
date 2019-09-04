import React from 'react';
import PropTypes from 'prop-types';
import MoviesContainer from './MoviesContainer';

const MoviesUpcoming = ({ movies }) => {
  if (!movies.length) return null;

  return (
    <MoviesContainer
      elevation={10}
      movies={movies}
      padding={1}
      title="Upcoming"
    />
  );
};

MoviesUpcoming.defaultProps = {
  movies: [],
};

MoviesUpcoming.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
    })
  ),
};

export default MoviesUpcoming;