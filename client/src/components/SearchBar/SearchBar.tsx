import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useGetMoviesSearchLazyQuery } from '../../generated/queries.generated';
import {
  StyledSearchBar,
  StyledSearchIcon,
  StyledInputBase,
} from './SearchBar.styles';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const [fetchMovies, { error, data, loading }] = useGetMoviesSearchLazyQuery();

  const router = useRouter();

  return (
    <Autocomplete
      id="downshift"
      loading={loading}
      noOptionsText={error ? error.networkError?.message : 'No results'}
      onInputChange={(evt, value, reason) => {
        const element = evt.target as HTMLElement;

        if (element.tagName === 'LI') {
          router.push({
            pathname: '/movie',
            query: {
              id: data?.moviesSearch.results.find(
                movie => movie.title === value
              )?.id,
            },
          });
        }
        if (reason === 'clear' || reason === 'reset') {
          setInputValue('');
        }
      }}
      open={!!inputValue}
      options={data?.moviesSearch.results.map(movie => movie.title) || []}
      popupIcon={null}
      renderInput={params => (
        <StyledSearchBar>
          <StyledSearchIcon />
          <StyledInputBase
            {...params}
            onChange={evt => {
              setInputValue(evt.target.value);
              fetchMovies({ variables: { query: evt.target.value } });
            }}
            placeholder="type a movie name..."
            value={inputValue}
          />
        </StyledSearchBar>
      )}
    />
  );
};

export default SearchBar;
