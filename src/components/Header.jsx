import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, InputBase } from '@material-ui/core';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import FavoritesIcon from '../containers/FavoritesIconContainer';
import { ReactComponent as Logo } from '../assets/logo.svg';

const FavoritesDropdown = lazy(() =>
  import('../containers/FavoritesDropdownContainer')
);

const Header = ({ inputValue, setInputValue, favoritesOpen }) => (
  <AppBar position="static">
    <Toolbar>
      <LogoContainer aria-label="Logo" onClick={() => setInputValue()} to="/">
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

/* STYLES */
const SearchBar = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${({ theme }) => fade(theme.palette.common.white, 0.15)};
  position: relative;
  width: auto;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: ${({ theme }) => theme.spacing(6)}px;
  }
  &:hover {
    background-color: ${({ theme }) => fade(theme.palette.common.white, 0.25)};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  height: 100%;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  pointer-events: none;
  position: absolute;
  width: ${({ theme }) => theme.spacing(4)}px;
`;

const StyledInputBase = styled(InputBase)`
  &.MuiInputBase-root {
    color: inherit;
  }
  & .MuiInputBase-input {
    padding: ${({ theme }) => theme.spacing(1, 1, 1, 7)};
    width: 190px;
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 400px;
    }
  }
`;

const LogoContainer = styled(Link)`
  cursor: pointer;
  display: none;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;
