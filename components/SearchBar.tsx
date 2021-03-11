import { TextField, Autocomplete } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Tv as TvIcon,
  Movie as MovieIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import Link from 'next/link';

import { useGetMoviesSearchLazyQuery } from 'apollo/__generated__';

const StyledAutocomplete = styled(Autocomplete)`
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

const IconWrapper = styled.span`
  margin-left: 5px;
  svg {
    font-size: inherit;
    margin-top: 5px;
  }
`;

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [fetchMovies, { data, loading, error }] = useGetMoviesSearchLazyQuery();

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
                fetchMovies({ variables: { query: newValue } });
              }
            }}
            placeholder="Search..."
            size="small"
          />
        </>
      )}
      renderOption={(props, movie: any) => (
        <Link key={movie.id} href={`/${movie.media_type}/${movie.id}`}>
          <li {...props}>
            {movie.title}
            <IconWrapper>
              {movie.media_type === 'tv' ? <TvIcon /> : <MovieIcon />}
            </IconWrapper>
          </li>
        </Link>
      )}
    />
  );
}
