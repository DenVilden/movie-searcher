import React from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'react-apollo';
import { CLEAR_INPUT_VALUE } from '../../graphql/types';
import MovieCard from './MovieCard';

const MovieCardContainer = ({ movie }) => {
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return <MovieCard clearInputValue={clearInputValue} movie={movie} />;
};

MovieCardContainer.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCardContainer;
