import { AppBar, Toolbar, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { useReactiveVar } from '@apollo/client';
import Favorites from '../Favorites/Favorites';
import { useGetMoviesSearchLazyQuery, autocompleteVar } from '../../apollo';

const StyledToolbar = styled(Toolbar)`
  padding: 0;

  ${props => props.theme.breakpoints.up('sm')} {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;

  ${props => props.theme.breakpoints.up('md')} {
    width: 70%;
  }

  input {
    color: #fafafa;
  }
`;

const StyledInputBase = styled(TextField)`
  background-color: ${props => fade(props.theme.palette.common.white, 0.15)};
  border-radius: ${props => props.theme.shape.borderRadius}px;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-left: ${props => props.theme.spacing(2)}px;
  }

  :hover {
    background-color: ${props => fade(props.theme.palette.common.white, 0.25)};
  }
`;

export const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const autocompleteValue = useReactiveVar(autocompleteVar);

  const [fetchMovies, { data, loading, error }] = useGetMoviesSearchLazyQuery();

  const router = useRouter();

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Link href="/">
          <Button title="logo" onClick={() => autocompleteVar('')}>
            <img alt="logo" src="/logo.svg" />
          </Button>
        </Link>
        <StyledAutocomplete
          autoHighlight
          blurOnSelect
          freeSolo
          id="autocomplete"
          value={autocompleteValue}
          loading={loading}
          onChange={(_evt, value, reason) => {
            if (reason === 'select-option') {
              const id = data?.moviesSearch.results.find(
                movie => movie.title === value,
              )?.id;
              autocompleteVar(value as string);
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
          open={!!inputValue}
          options={data?.moviesSearch.results.map(movie => movie.title) || []}
          renderInput={params => (
            <StyledInputBase
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              error={!!error}
              variant="outlined"
              margin="dense"
              value={inputValue}
              placeholder="type a movie name..."
              fullWidth
            />
          )}
        />
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
