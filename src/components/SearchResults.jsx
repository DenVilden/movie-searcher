import React from 'react';
import PropTypes from 'prop-types';
import MoviesContainer from './MoviesContainer';

const SearchResults = ({ movies }) => (
  <MoviesContainer elevation={0} movies={movies} />
);

SearchResults.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default SearchResults;
