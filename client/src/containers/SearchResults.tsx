import React from 'react';
import { LinearProgress } from '@material-ui/core';
import ErrorMessage from './ErrorMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetMoviesSearchQuery } from '../__generated__';

type Props = {
  query: string;
};

const SearchResults = ({ query }: Props) => {
  const { loading, error, data, fetchMore } = useGetMoviesSearchQuery({
    variables: { query },
  });

  if (loading) return <LinearProgress color="secondary" />;

  if (error || !data) {
    return (
      <ErrorMessage gutterBottom>
        {error?.message || 'No data found'}
      </ErrorMessage>
    );
  }

  if (!data.moviesSearch.results.length)
    return <ErrorMessage gutterBottom>No results</ErrorMessage>;

  return (
    <MoviesBox
      elevation={0}
      hasMore={data.moviesSearch.hasMore}
      movies={data.moviesSearch.results}
      padding={0}
      showMore={() =>
        fetchMore({
          variables: { cursor: data.moviesSearch.cursor },
          updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev,
        })
      }
    />
  );
};

export default SearchResults;
