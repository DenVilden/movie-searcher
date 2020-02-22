import React from 'react';
import Spinner from '../components/Spinner';
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

  if (loading) return <Spinner />;

  if (error || !data?.moviesSearch.results.length) {
    return (
      <ErrorMessage gutterBottom>
        {error ? error.message : 'Nothing found'}
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
