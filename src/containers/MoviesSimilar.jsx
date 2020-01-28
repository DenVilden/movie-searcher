import React from 'react';
import PropTypes from 'prop-types';
import MoviesBox from '../components/MoviesBox/MoviesBox';

const MoviesSimilar = ({ movies }) => {
  if (!movies.length) return null;

  return (
    <MoviesBox
      elevation={10}
      movies={movies}
      padding={1}
      title="Similar Movies"
    />
  );
};

MoviesSimilar.defaultProps = {
  movies: null,
};

MoviesSimilar.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ),
};

export default MoviesSimilar;
