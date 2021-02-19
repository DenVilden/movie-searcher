import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { useGetMoviesSearchLazyQuery } from '../../__generated__';

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
    fetchPolicy: 'network-only',
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
      onChange={(_evt, movie: any, reason) => {
        if (reason === 'select-option') {
          router.push(`/${movie.media_type}/${movie.id}`);
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
      options={data?.moviesSearch.results || []}
      getOptionLabel={(option: any) => option.title}
      renderInput={(params) => (
        <StyledInputBase
          {...params}
          error={Boolean(error)}
          variant="outlined"
          margin="dense"
          placeholder="search for movies and tv shows"
          fullWidth
        />
      )}
    />
  );
}
