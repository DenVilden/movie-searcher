import React from 'react';
import PropTypes from 'prop-types';
import MoviesBox from '../components/MoviesBox/MoviesBox';

const MoviesUpcoming = ({ movies }) => {
  if (!movies) return null;

  return (
    <MoviesBox elevation={10} movies={movies} padding={1} title="Upcoming" />
  );
};

MoviesUpcoming.defaultProps = {
  movies: null,
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
