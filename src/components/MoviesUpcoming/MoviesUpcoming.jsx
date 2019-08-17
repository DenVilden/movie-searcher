import React from 'react';
import PropTypes from 'prop-types';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

const MoviesUpcoming = ({ movies }) => (
  <MoviesContainer
    elevation={10}
    movies={movies}
    padding={1}
    title="Upcoming"
  />
);

MoviesUpcoming.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
    })
  ).isRequired,
};

export default MoviesUpcoming;
