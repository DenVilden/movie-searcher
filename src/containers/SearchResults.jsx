import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SEARCH_MOVIES } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { SET_INPUT_VALUE } from '../graphql/mutations';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

const propTypes = {
  inputValue: PropTypes.string.isRequired,
};

const SearchResults = ({ inputValue }) => {
  const { loading, error, data } = useQuery(GET_SEARCH_MOVIES, {
    variables: { query: inputValue },
  });
  const [setInputValue] = useMutation(SET_INPUT_VALUE);

  if (loading) return <Spinner />;

  if (error || !data.moviesSearch.length) {
    return (
      <ErrorMessage gutterBottom>
        {error ? error.message : 'Nothing found'}
      </ErrorMessage>
    );
  }

  return (
    <MoviesBox
      clearInputValue={setInputValue}
      elevation={0}
      movies={data.moviesSearch}
      padding={0}
    />
  );
};

SearchResults.propTypes = propTypes;

export default SearchResults;
