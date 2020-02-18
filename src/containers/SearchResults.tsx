import React, { lazy } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_MOVIES_SEARCH } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { SET_INPUT_VALUE } from '../graphql/mutations';
import {
  GetMoviesSearch,
  GetMoviesSearchVariables,
} from '../graphql/__generated__/GetMoviesSearch';
import {
  SetInputValue,
  SetInputValueVariables,
} from '../graphql/__generated__/SetInputValue';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

type Props = {
  inputValue: string;
};

const SearchResults = ({ inputValue }: Props) => {
  const { loading, error, data } = useQuery<
    GetMoviesSearch,
    GetMoviesSearchVariables
  >(GET_MOVIES_SEARCH, {
    variables: { query: inputValue },
  });
  const [setInputValue] = useMutation<SetInputValue, SetInputValueVariables>(
    SET_INPUT_VALUE,
    {
      variables: { value: '' },
    }
  );

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
      clearInputValue={setInputValue}
      elevation={0}
      movies={data.moviesSearch}
      padding={0}
    />
  );
};

export default SearchResults;
