import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { css } from '@emotion/react';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@material-ui/icons';
import { useReactiveVar } from '@apollo/client/react';
import Link from 'next/link';

import { prefersDarkModeVar } from 'apollo/client';
import Favorites from './Favorites';
import SearchBar from './SearchBar';
import Logo from './Logo';

export default function Header() {
  const prefersDarkMode = useReactiveVar(prefersDarkModeVar);

  const toggleTheme = () => {
    const toggle = !prefersDarkMode;
    prefersDarkModeVar(toggle);
    localStorage.setItem('darkMode', JSON.stringify(toggle));
  };

  return (
    <AppBar color={prefersDarkMode ? 'inherit' : 'primary'} position="fixed">
      <Toolbar
        css={css`
          padding: 0 4px;
        `}
      >
        <Link href="/">
          <IconButton aria-label="go to home page">
            <Logo />
          </IconButton>
        </Link>
        <SearchBar />
        <IconButton
          aria-label="theme switch"
          css={css`
            margin-left: auto;
          `}
          onClick={toggleTheme}
        >
          {prefersDarkMode ? <LightIcon /> : <DarkIcon htmlColor="white" />}
        </IconButton>
        <Favorites />
      </Toolbar>
    </AppBar>
  );
}
