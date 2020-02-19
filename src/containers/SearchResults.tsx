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
  const { loading, error, data } = useGetMoviesSearchQuery({
    variables: { query: inputValue },
  });
  const [setInputValueMutation] = useSetInputValueMutation({
    variables: { value: '' },
  });

  if (loading) return <Spinner />;

  if (error || !data?.moviesSearch.length) {
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
      movies={data.moviesSearch}
      padding={0}
    />
  );
};

export default SearchResults;
