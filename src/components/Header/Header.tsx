import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
  SearchBar,
  StyledSearchIcon,
  StyledInputBase,
  LogoContainer,
} from './Header.styles';
import Favorites from '../../containers/Favorites';

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

const Header = ({ inputValue, setInputValue }: Props) => (
  <AppBar position="static">
    <Toolbar>
      <LogoContainer aria-label="Logo" onClick={() => setInputValue('')} to="/">
        <Logo />
      </LogoContainer>
      <SearchBar>
        <StyledSearchIcon />
        <label aria-label="search bar" htmlFor="input">
          <StyledInputBase
            id="input"
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

export default Header;
