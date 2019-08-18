import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import {
  SearchBar,
  StyledSearchIcon,
  StyledInputBase,
  LogoContainer,
} from './Header.styles';
import { ReactComponent as Logo } from '../../logo.svg';
import FavoritesDropdown from '../FavoritesDropdown/FavoritesDropdown.container';
import Spinner from '../Spinner/Spinner';

const MoviesSearch = lazy(() =>
  import('../MoviesSearch/MoviesSearch.container')
);

const Header = ({ inputValue, setInputValue }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <LogoContainer to="/" onClick={setInputValue}>
          <Logo />
        </LogoContainer>
        <SearchBar>
          <StyledSearchIcon />
          <label aria-label="search bar">
            <StyledInputBase
              onChange={evt => setInputValue(evt.target.value)}
              placeholder="type a movie name..."
              type="search"
              value={inputValue}
            />
          </label>
        </SearchBar>
        <FavoritesDropdown />
      </Toolbar>
    </AppBar>
    <Suspense fallback={<Spinner />}>
      {inputValue && <MoviesSearch inputValue={inputValue} />}
    </Suspense>
  </>
);

Header.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

export default Header;
