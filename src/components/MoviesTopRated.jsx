import React from 'react';
import PropTypes from 'prop-types';
import MoviesContainer from './MoviesContainer';

const MoviesTopRated = ({ movies }) => {
  if (!movies.length) return null;

  return (
    <MoviesContainer
      elevation={10}
      movies={movies}
      padding={1}
      title="Top Rated"
    />
  );
};

MoviesTopRated.defaultProps = {
  movies: [],
};

MoviesTopRated.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ),
};

export default MoviesTopRated;