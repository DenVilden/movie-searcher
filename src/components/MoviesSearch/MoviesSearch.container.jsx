import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import MoviesSearch from './MoviesSearch';
import Spinner from '../Spinner/Spinner';
import ErrorBlock from '../ErrorBlock/ErrorBlock';

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
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { query }
  });

  if (loading) return <Spinner />;

  if (error || !data.moviesSearch.length) {
    return (
      <ErrorBlock gutterBottom>
        {error ? `${error.message}` : 'Nothing found'}
      </ErrorBlock>
    );
  }

  return <MoviesSearch movies={data.moviesSearch} />;
};

MoviesSearchContainer.propTypes = {
  query: PropTypes.string.isRequired
};

export default MoviesSearchContainer;
