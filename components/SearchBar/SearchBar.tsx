import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { useGetMoviesSearchLazyQuery } from '../../apollo';

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  margin-right: 10px;
  margin-left: 5px;

  ${(props) => props.theme.breakpoints.up('md')} {
    width: 80%;
  }

  input {
    color: #fafafa;
  }
`;

const StyledInputBase = styled(TextField)`
  background-color: ${(props) => fade(props.theme.palette.common.white, 0.15)};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-left: ${(props) => props.theme.spacing(2)}px;
  }

  :hover {
    background-color: ${(props) =>
      fade(props.theme.palette.common.white, 0.25)};
  }
`;

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');

  const [fetchMovies, { data, loading, error }] = useGetMoviesSearchLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const router = useRouter();

  return (
    <StyledAutocomplete
      autoHighlight
      blurOnSelect
      freeSolo
      clearOnBlur
      inputValue={inputValue}
      id="autocomplete"
      loading={loading || Boolean(error)}
      loadingText={loading ? 'Loading...' : error?.message}
      onChange={(_evt, value, reason) => {
        if (reason === 'select-option') {
          const id = data?.moviesSearch.results.find(
            (movie) => movie.title === (value as string),
          )?.id;

          router.push(`/movie/${id}`);
        }
      }}
      onInputChange={(_evt, value: string, reason) => {
        if (reason === 'input' && value) {
          setInputValue(value);
          fetchMovies({ variables: { query: value, pageSize: 8 } });
        } else {
          setInputValue('');
        }
      }}
      open={Boolean(inputValue)}
      options={data?.moviesSearch.results.map((movie) => movie.title) || []}
      renderInput={(params) => (
        <StyledInputBase
          {...params}
          error={Boolean(error)}
          variant="outlined"
          margin="dense"
          placeholder="type a movie name..."
          fullWidth
        />
      )}
    />
  );
}
