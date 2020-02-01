import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { GET_SEARCH_MOVIES } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MoviesBox from '../components/MoviesBox/MoviesBox';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

const SearchResults = ({ inputValue, movies }) => {
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

  return <MoviesBox elevation={0} movies={movies} />;
};

SearchResults.propTypes = {
  inputValue: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default SearchResults;
