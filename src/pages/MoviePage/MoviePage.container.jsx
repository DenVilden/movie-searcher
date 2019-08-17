import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import MoviePage from './MoviePage';
import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const GET_MOVIE_INFO = gql`
  query($id: String!) {
    movieInfo(id: $id) {
      id
      backdrop_path
      poster_path
      title
      overview
      budget
      revenue
      vote_average
      release_date
      similar {
        results {
          id
          title
          release_date
          poster_path
        }
      }
    }
  }
`;

const MoviePageContainer = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MOVIE_INFO, {
    variables: { id },
  });

  if (loading) return <Spinner />;

  if (error) return <ErrorBoundary>{error.message}</ErrorBoundary>;

  return <MoviePage movie={data.movieInfo} />;
};

MoviePageContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MoviePageContainer;
