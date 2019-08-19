import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SET_INPUT_VALUE } from '../../graphql/mutations';
import MovieCard from './MovieCard';

const MovieCardContainer = ({ movie, history }) => {
  const [setInputValue] = useMutation(SET_INPUT_VALUE);

  return (
    <MovieCard setInputValue={setInputValue} movie={movie} history={history} />
  );
};

MovieCardContainer.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MovieCardContainer);
