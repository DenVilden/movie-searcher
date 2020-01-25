import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import FavoritesIcon from '../FavoritesIcon/FavoritesIcon.container';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
  SearchBar,
  StyledSearchIcon,
  StyledInputBase,
  LogoContainer,
} from './Header.styles';

const FavoritesDropdown = lazy(() =>
  import('../FavoritesDropdown/FavoritesDropdown.container')
);

const Header = ({ inputValue, setInputValue, favoritesOpen, isHomePage }) => (
  <AppBar position="static">
    <Toolbar>
      <LogoContainer
        aria-label="Logo"
        onClick={!isHomePage ? () => setInputValue() : null}
        to="/"
      >
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
      <FavoritesIcon />
      <Suspense fallback={<> </>}>
        {favoritesOpen && <FavoritesDropdown open={favoritesOpen} />}
      </Suspense>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  favoritesOpen: PropTypes.bool.isRequired,
  isHomePage: PropTypes.bool.isRequired,
};

export default Header;
