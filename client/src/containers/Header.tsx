import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import Favorites from './Favorites';
import Logo from '../components/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Logo />
      <SearchBar />
      <Favorites />
    </Toolbar>
  </AppBar>
);

export default Header;
