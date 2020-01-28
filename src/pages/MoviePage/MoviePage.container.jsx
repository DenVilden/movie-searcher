import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIE_INFO } from '../../graphql/queries';
import Spinner from '../../components/Spinner';
import MoviePage from './MoviePage';

const ErrorMessage = lazy(() => import('../../containers/ErrorMessage'));

const MoviePageContainer = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MOVIE_INFO, {
    variables: { id },
  });

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <MoviePage info={data.movieInfo} similar={data.movieInfo.similar.results} />
  );
};

MoviePageContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MoviePageContainer;
