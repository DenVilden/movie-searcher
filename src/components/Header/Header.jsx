import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { SearchBar, StyledSearchIcon, StyledInputBase } from './Header.styles';
import MoviesFavorites from '../MoviesFavorites/MoviesFavorites.container';
import MoviesSearch from '../MoviesSearch/MoviesSearch.container';
import { ReactComponent as Logo } from '../../assets/camera.svg';

const Header = ({ inputValue, setInputValue, clearInputValue, history }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography color="inherit" noWrap variant="h6">
          <Logo
            onClick={() => {
              history.push('/');
              clearInputValue();
            }}
          />
        </Typography>
        <SearchBar>
          <StyledSearchIcon />
          <StyledInputBase
            onChange={evt => setInputValue(evt.target.value)}
            placeholder="type a movie name..."
            type="search"
            value={inputValue}
          />
        </SearchBar>
        <MoviesFavorites />
      </Toolbar>
    </AppBar>
    {inputValue && <MoviesSearch query={inputValue} />}
  </>
);

Header.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  clearInputValue: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Header;
