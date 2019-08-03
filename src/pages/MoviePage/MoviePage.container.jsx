import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import MoviePage from './MoviePage';
import useFetchEffect from '../../hooks/useFetchEffect';
import { fetchMovie } from '../../actions/movie.action';
import { fetchSimilarMovies } from '../../actions/similar.action';
import { selectMovieFetching } from '../../selectors/movie.selector';

const MoviePageContainer = ({ id }) => {
  const loading = useSelector(selectMovieFetching);

  useFetchEffect(fetchMovie, fetchSimilarMovies, id);

  return <MoviePage loading={loading} />;
};

MoviePageContainer.propTypes = {
  id: PropTypes.string.isRequired
};

export default MoviePageContainer;
