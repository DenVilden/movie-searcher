import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { GET_SEARCH_MOVIES } from '../../graphql/queries';
import SearchResults from './SearchResults';
import Spinner from '../../components/Spinner';

const ErrorMessage = lazy(() => import('../ErrorMessage'));

const SearchResultsContainer = ({ inputValue }) => {
  const { loading, error, data } = useQuery(GET_SEARCH_MOVIES, {
    variables: { query: inputValue },
  });

  if (loading) return <Spinner />;

  if (error || !data.moviesSearch.length) {
    return (
      <ErrorMessage gutterBottom>
        {error ? error.message : 'Nothing found'}
      </ErrorMessage>
    );
  }

  return <SearchResults movies={data.moviesSearch} />;
};

SearchResultsContainer.propTypes = {
  inputValue: PropTypes.string.isRequired,
};

export default SearchResultsContainer;
