import React from 'react';
import { LinearProgress } from '@material-ui/core';
import ErrorMessage from '../components/ErrorMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import {
  useSetInputValueMutation,
  useGetMoviesSearchQuery,
} from '../__generated__';

type Props = {
  inputValue: string;
};

const SearchResults = ({ inputValue }: Props) => {
  const { loading, error, data, fetchMore } = useGetMoviesSearchQuery({
    variables: { query: inputValue },
  });
  const [setInputValueMutation] = useSetInputValueMutation({
    variables: { value: '' },
  });

  if (loading) return <LinearProgress color="secondary" />;

  if (error || !data?.moviesSearch.results.length) {
    return (
      <ErrorMessage gutterBottom>
        {error?.message || 'Nothing found'}
      </ErrorMessage>
    );
  }

  return (
    <MoviesBox
      clearInputValue={setInputValueMutation}
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
