import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import SearchResults from './SearchResults';
import Spinner from '../Spinner/Spinner';

const ErrorBoundary = lazy(() => import('../ErrorBoundary/ErrorBoundary'));

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

const SearchResultsContainer = ({ inputValue }) => {
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { query: inputValue },
  });

  if (loading) return <Spinner />;

  if (error || !data.moviesSearch.length) {
    return (
      <ErrorBoundary gutterBottom>
        {error ? error.message : 'Nothing found'}
      </ErrorBoundary>
    );
  }

  return <SearchResults movies={data.moviesSearch} />;
};

SearchResultsContainer.propTypes = {
  inputValue: PropTypes.string.isRequired,
};

export default SearchResultsContainer;
