import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import {
  Brightness7 as LightIcon,
  Brightness4 as DarkIcon,
} from '@material-ui/icons';
import { memo } from 'react';
import { useReactiveVar } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { Favorites, SearchBar } from '..';
import { prefersDarkModeVar } from '../../apollo';

const StyledToolbar = styled(Toolbar)`
  padding-left: 8px;
  padding-right: 8px;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

function Header() {
  const prefersDarkMode = useReactiveVar(prefersDarkModeVar);

  const toggleTheme = () => {
    const toggle = !prefersDarkMode;
    prefersDarkModeVar(toggle);
    localStorage.setItem('darkMode', JSON.stringify(toggle));
  };

  return (
    <AppBar position="static" color={prefersDarkMode ? 'inherit' : 'primary'}>
      <StyledToolbar>
        <Link href="/">
          <a href="/">
            <StyledImage
              src="/logo.svg"
              width="50"
              height="50"
              aria-label="logo"
            />
          </a>
        </Link>
        <SearchBar />
        <StyledIconButton aria-label="theme switch" onClick={toggleTheme}>
          {prefersDarkMode ? (
            <LightIcon style={{ color: 'white' }} />
          ) : (
            <DarkIcon />
          )}
        </StyledIconButton>
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
}

export default memo(Header);
