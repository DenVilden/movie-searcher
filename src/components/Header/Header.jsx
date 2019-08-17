import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  SearchBar,
  StyledSearchIcon,
  StyledInputBase,
  StyledLogo,
} from './Header.styles';
import MoviesFavorites from '../MoviesFavorites/MoviesFavorites.container';
import MoviesSearch from '../MoviesSearch/MoviesSearch.container';

const Header = ({ inputValue, setInputValue, clearInputValue }) => {
  const onClear = () => {
    if (inputValue) {
      clearInputValue();
    }
  };

  const onChange = evt => {
    setInputValue(evt.target.value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" noWrap variant="h6">
            <Link to="/" onClick={onClear} aria-label="Go to main page">
              <StyledLogo />
            </Link>
          </Typography>
          <SearchBar>
            <StyledSearchIcon />
            <label aria-label="search bar">
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
};

export default Header;
