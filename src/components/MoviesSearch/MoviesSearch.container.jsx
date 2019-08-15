import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import MoviesSearch from './MoviesSearch';
import Spinner from '../Spinner/Spinner';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

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

const MoviesSearchContainer = ({ inputValue }) => {
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { query: inputValue }
  });

  if (loading) return <Spinner />;

  if (error || !data.moviesSearch.length) {
    return (
      <ErrorBoundary gutterBottom>
        {error ? error.message : 'Nothing found'}
      </ErrorBoundary>
    );
  }

  return <MoviesSearch movies={data.moviesSearch} />;
};

MoviesSearchContainer.propTypes = {
  inputValue: PropTypes.string.isRequired
};

export default MoviesSearchContainer;
