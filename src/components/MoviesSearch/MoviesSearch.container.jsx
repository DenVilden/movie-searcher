import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import MoviesSearch from './MoviesSearch';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

const GET_MOVIES = gql`
  query($query: String!) {
    moviesSearch(query: $query) {
      id
      title
      release_date
      poster_path
    }
  }
`;

const MoviesSearchContainer = ({ query }) => {
  const {
    loading,
    error,
    data: { moviesSearch }
  } = useQuery(GET_MOVIES, { variables: { query } });

  if (loading) return <Spinner />;

  if (error || !moviesSearch.length) {
    return (
      <Error align="center" color="error" gutterBottom variant="h6">
        {error ? `${error.message}` : 'Nothing found'}
      </Error>
    );
  }

  return <MoviesSearch movies={moviesSearch} />;
};

MoviesSearchContainer.propTypes = {
  query: PropTypes.string.isRequired
};

export default MoviesSearchContainer;
