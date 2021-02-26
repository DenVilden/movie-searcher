import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { useGetMoviesSearchLazyQuery } from '../../__generated__';

const StyledAutocomplete = styled(Autocomplete)`
  margin-left: 5px;
  margin-right: 10px;
  width: 100%;

  ${(props) => props.theme.breakpoints.up('md')} {
    width: 80%;
  }

  input {
    color: #fafafa;
  }
`;

const StyledTextField = styled(TextField)`
  background-color: ${(props) => fade(props.theme.palette.common.white, 0.15)};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-left: ${(props) => props.theme.spacing(2)}px;
  }

  :hover {
    background-color: ${(props) =>
      fade(props.theme.palette.common.white, 0.25)};
  }

  input {
    margin-left: ${(props) => props.theme.spacing(5)}px;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: rgba(0, 0, 0, 0.87);
  font-size: 25px;
  height: 100%;
  margin-left: ${(props) => props.theme.spacing(2)}px;
  margin-top: 2px;
  position: absolute;
  top: 0;
  user-select: none;

  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-left: ${(props) => props.theme.spacing(4)}px;
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
      blurOnSelect
      freeSolo
      inputValue={inputValue}
      id="autocomplete"
      loading={
        loading ||
        !!error ||
        (!data?.moviesSearch.results.length && !!inputValue.trim())
      }
      loadingText={loading ? 'Loading...' : error?.message || 'No results'}
      onChange={(_evt, movie: any, reason) => {
        if (reason === 'select-option') {
          router.push(`/${movie.media_type}/${movie.id}`);
        } else {
          setInputValue('');
        }
      }}
      filterOptions={(options) => options}
      openOnFocus
      options={data && inputValue.trim() ? data.moviesSearch.results : []}
      getOptionLabel={(movie: any) => movie.title}
      renderInput={(params) => (
        <>
          <StyledSearchIcon />
          <StyledTextField
            {...params}
            error={!!error}
            variant="outlined"
            margin="dense"
            onChange={(evt) => {
              setInputValue(evt.target.value);

              const newValue = evt.target.value.trim();

              if (newValue && newValue !== inputValue.trim()) {
                fetchMovies({ variables: { query: newValue, pageSize: 8 } });
              }
            }}
            placeholder="Search..."
            fullWidth
          />
        </>
      )}
    />
  );
}
