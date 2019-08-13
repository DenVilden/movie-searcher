import React from 'react';
import PropTypes from 'prop-types';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

const MoviesTopRated = ({ movies }) => (
  <MoviesContainer
    elevation={10}
    movies={movies}
    padding={1}
    text="rating"
    title="Top Rated"
  />
);

MoviesTopRated.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      vote_average: PropTypes.number
    })
  ).isRequired
};

export default MoviesTopRated;
