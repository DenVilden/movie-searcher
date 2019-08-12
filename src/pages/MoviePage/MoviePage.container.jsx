import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import MoviePage from './MoviePage';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';

const GET_MOVIE_INFO = gql`
  query($id: ID!) {
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
      similarMovies {
        id
        title
        release_date
        poster_path
      }
    }
  }
`;

const MoviePageContainer = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MOVIE_INFO, {
    variables: { id }
  });

  if (loading) return <Spinner />;
  if (error) {
    return (
      <Error align="center" color="error" gutterBottom variant="h6">
        {error.message}
      </Error>
    );
  }
  return <MoviePage movie={data.movieInfo} />;
};

MoviePageContainer.propTypes = {
  id: PropTypes.string.isRequired
};

export default MoviePageContainer;
