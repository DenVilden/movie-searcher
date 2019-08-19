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
import FavoritesIcon from '../FavoritesIcon/FavoritesIcon.container';

const FavoritesDropdown = lazy(() =>
  import('../FavoritesDropdown/FavoritesDropdown.container')
);

const Header = ({ inputValue, setInputValue, favoritesOpen }) => (
  <AppBar position="static">
    <Toolbar>
      <LogoContainer to="/" onClick={() => setInputValue('')}>
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
};

export default Header;
