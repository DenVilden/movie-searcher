import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { alpha } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import { useGetMoviesSearchLazyQuery } from '../__generated__';

const StyledAutocomplete = styled(Autocomplete)`
  margin-left: 5px;
  margin-right: 10px;
  width: 70%;

  input {
    color: #fafafa;
    margin-left: ${({ theme }) => theme.spacing(5)};
  }
`;

const StyledTextField = styled(TextField)`
  background-color: ${({ theme }) => alpha(theme.palette.common.white, 0.15)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }) => theme.spacing(1)};
  }

  :hover {
    background-color: ${({ theme }) => alpha(theme.palette.common.white, 0.25)};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: rgba(0, 0, 0, 0.87);
  font-size: 25px;
  height: 100%;
  margin-left: ${({ theme }) => theme.spacing(2)};
  position: absolute;
  top: 0;
  user-select: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }) => theme.spacing(3)};
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
      filterOptions={options => options}
      freeSolo
      getOptionLabel={(movie: any) => movie.title}
      id="autocomplete"
      inputValue={inputValue}
      loading={
        loading ||
        !!error ||
        (!data?.moviesSearch.results.length && !!inputValue.trim())
      }
      loadingText={loading ? 'Loading...' : error?.message || 'No results'}
      onChange={(_evt, movie: any, reason) => {
        if (reason === 'select-option') {
          router.push(`/${movie.media_type}/${movie.id}`);
        }
      }}
      onInputChange={(_evt, _value, reason) => {
        if (reason === 'clear') {
          setInputValue('');
        }
      }}
      openOnFocus
      options={(inputValue.trim() && data?.moviesSearch.results) || []}
      renderInput={params => (
        <>
          <StyledSearchIcon />
          <StyledTextField
            {...params}
            error={!!error}
            fullWidth
            id="search field"
            onChange={({ target: { value } }) => {
              setInputValue(value);

              const newValue = value.trim();

              if (newValue && newValue !== inputValue.trim()) {
                fetchMovies({ variables: { pageSize: 8, query: newValue } });
              }
            }}
            placeholder="Search..."
            size="small"
          />
        </>
      )}
    />
  );
}