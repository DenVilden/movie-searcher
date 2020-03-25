import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import Favorites from './Favorites';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';

const defaultProps = {
  testing: false,
};

const Header = ({ testing }: typeof defaultProps) => (
  <AppBar position="static">
    <Toolbar>
      <Logo />
      <SearchBar testing={testing} />
      <Favorites />
    </Toolbar>
  </AppBar>
);

Header.defaultProps = defaultProps;

export default Header;
