import React from 'react';
import { useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { CLEAR_INPUT_VALUE } from '../../graphql/types';
import MovieCard from './MovieCard';

const MovieCardContainer = props => {
  const [clearInputValue] = useMutation(CLEAR_INPUT_VALUE);

  return <MovieCard clearMovies={clearInputValue} {...props} />;
};

export default withRouter(MovieCardContainer);
