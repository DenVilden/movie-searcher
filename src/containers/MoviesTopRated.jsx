import React from 'react';
import PropTypes from 'prop-types';
import MoviesBox from '../components/MoviesBox/MoviesBox';

const MoviesTopRated = ({ movies }) => {
  if (!movies) return null;

  return (
    <MoviesBox elevation={10} movies={movies} padding={1} title="Top Rated" />
  );
};

MoviesTopRated.defaultProps = {
  movies: null,
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
