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
import Favorites from './Favorites';
import SearchBar from './SearchBar';
import { prefersDarkModeVar } from '../apollo';

const StyledToolbar = styled(Toolbar)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

const StyledDarkIcon = styled(DarkIcon)`
  color: white;
`;

const StyledImage = styled(Image)`
  -webkit-user-drag: none;
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
      <StyledToolbar disableGutters>
        <Link href="/">
          <IconButton>
            <StyledImage
              src="/logo.svg"
              width="45"
              height="45"
              aria-label="logo"
            />
          </IconButton>
        </Link>
        <SearchBar />
        <StyledIconButton aria-label="theme switch" onClick={toggleTheme}>
          {prefersDarkMode ? <LightIcon /> : <StyledDarkIcon />}
        </StyledIconButton>
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
}

export default memo(Header);
