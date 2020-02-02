import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
  SearchBar,
  StyledSearchIcon,
  StyledInputBase,
  LogoContainer,
} from './Header.styles';
import Favorites from '../../containers/Favorites';

const Header = ({ inputValue, setInputValue, isHomePage }) => (
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
      <Favorites />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  isHomePage: PropTypes.bool.isRequired,
};

export default Header;
