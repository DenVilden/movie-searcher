import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import {
  SearchBar,
  StyledSearchIcon,
  StyledInputBase,
  StyledLogo,
} from './Header.styles';
import MoviesFavorites from '../MoviesFavorites/MoviesFavorites.container';
import MoviesSearch from '../MoviesSearch/MoviesSearch.container';

const Header = ({ inputValue, setInputValue, clearInputValue, history }) => {
  const goTo = useCallback(() => {
    history.push('/');
    clearInputValue();
  }, [clearInputValue, history]);

  const onChange = useCallback(evt => setInputValue(evt.target.value), [
    setInputValue,
  ]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" noWrap variant="h6">
            <StyledLogo onClick={goTo} />
          </Typography>
          <SearchBar>
            <StyledSearchIcon />
            <label aria-label="SearchBar">
              <StyledInputBase
                onChange={onChange}
                placeholder="type a movie name..."
                type="search"
                value={inputValue}
              />
            </label>
          </SearchBar>
          <MoviesFavorites />
        </Toolbar>
      </AppBar>
      {inputValue && <MoviesSearch inputValue={inputValue} />}
    </>
  );
};

Header.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  clearInputValue: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
